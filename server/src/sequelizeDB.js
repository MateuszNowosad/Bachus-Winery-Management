// import Sequelize from 'sequelize';

// import jwt from 'jsonwebtoken';
// import createJwtToken from '../utils/createJwtToken';
// import { getSetQueryFragments } from '../utils/sequelize';
// import moment from 'moment';
// import ConnectDataService from '../services/ConnectDataService';
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    database: 'bachusWinery',
    username: 'test',
    password: 'test',
    dialect: 'mysql',
    host: '172.17.0.2',
});

// const sequelize = new Sequelize('mysql://test@172.17.0.2:3306/bachusWinery');

sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

const Adres = sequelize.define('Adres', {
    idAdres: Sequelize.STRING,
    miasto: Sequelize.STRING,
    kodPocztowy: Sequelize.STRING,
    ulica: Sequelize.STRING,
    nrLokalu: Sequelize.STRING,
    nrPosesji: Sequelize.STRING,
    kraj: Sequelize.STRING
});

sequelize.sync().then(() => Adres.create({
    idAdres: '1',
    miasto: 'Lublin',
    kodPocztowy: '20-060',
    ulica: 'Polna',
    nrLokalu: '5',
    nrPosesji: '2',
    kraj: 'Polska'
})).then(adres => {
    console.log(adres.toJSON());
});

// sequelize.sync().then(() => User.create({
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20)
//     }))
//     .then(jane => {
//         console.log(jane.toJSON());
//     });

/*
export default class ConnectMySqlRepository {
    static async login(email, passwordHash) {
        const userRecord = await sequelize.query(
            'Select * from users where email = :email',
            { raw: true, type: Sequelize.QueryTypes.SELECT, replacements: { email }, }
        );
        const storedPasswordHash = userRecord[0] && userRecord[0].passwordHash;
        const passwordMatch = passwordHash === storedPasswordHash;
        if (passwordMatch) {
            const userPermissions = await sequelize.query(
                'Select * from vwUserPermissions where email = :email',
                { raw: true, type: Sequelize.QueryTypes.SELECT, replacements: { email }, }
            );
            const permittedActions = userPermissions
                .filter(permission => permission.claimType === 'route action')
                .map(permission => ({
                    claimName: permission.claimName,
                    routeName: permission.routeName,
                    actionVerb: permission.actionVerb,
                    actionSubject: permission.actionSubject,
                }));
            const defaultPath = userPermissions
                .find(permission => permission.claimType === 'route' && permission.claimOrder === 1).routeName;
            const user = {
                districtLabel: userRecord[0].districtLabel,
                email: userRecord[0].email,
                id: userRecord[0].id,
                role: userPermissions[0].roleName,
                roleId: userPermissions[0].roleId,
                defaultPath,
                drawerItems: [...new Set(userPermissions.map(permission => permission.routeName))],
                permittedActions,
            };
            return createJwtToken(user);
        }
        return null;
    }
    static async getUsers() {
        const users = await sequelize.query(
            `select u.*, r.id roleId, r.name roleName
      from users u
      join userRoles ur on u.id = ur.userId
      join roles r on ur.roleId = r.id`,
            { raw: true, type: Sequelize.QueryTypes.SELECT },
        );
        return users;
    }
    static async getRoles() {
        const roles = await sequelize.query(
            'Select * from roles',
            { raw: true, type: Sequelize.QueryTypes.SELECT }
        );
        return roles;
    }
    static async getDistricts(state, filterString) {
        return
    }
    static async getRecordStats(districtNumber, date) {
        return
    }
    static async getWhiteListedDomains() {
        return
    }
    static async getLegalTerms() {
        const legalTermsData = await sequelize.query(
            `select ltt.name, lt.uri, lt.description
        from legalTerms lt
        join legalTermTypes ltt on lt.type = ltt.id
        where lt.active = 1;`,
            { raw: true, type: Sequelize.QueryTypes.SELECT }
        );
        const legalTerms = legalTermsData.reduce((acc, curr) => {
            const { name, uri, description } = curr;
            if (!acc[name]) {
                acc[name] = { uri, description };
            }
            return acc;
        }, {});
        return legalTerms;
    }
    static async checkUserExists({ email }) {
        const userResponse = await sequelize.query(
            'select 1 from users where email = :email',
            { raw: true, type: Sequelize.QueryTypes.SELECT, replacements: { email } },
        );
        return Boolean(userResponse[0]);
    }
    static async createUser({ email, firstName, lastName, active, roleId }) {
        const userResponse = await sequelize.query(`Insert into users (email, firstName, lastName, active, passwordExpiration, prescribedRoleId)
      values (:email, :firstName, :lastName, :active, date_add(current_timestamp, interval 24 hour), :roleId);`,
            {
                raw: true,
                type: Sequelize.QueryTypes.INSERT,
                replacements: { email, firstName, lastName, active, roleId },
            }
        );
        const userId = userResponse[0];
        const userRoleResponse = await sequelize.query(`Insert into userRoles (userId, roleId)
      select :userId, (select id from roles where name = 'unverifiedUser' limit 1);`,
            {
                raw: true,
                type: Sequelize.QueryTypes.INSERT,
                replacements: { userId, roleId },
            }
        );
        return userId;
    }
    static async editUser(userId, updatedUserData) {
        const { roleId, ...rest } = updatedUserData;
        const setQueryFragments = getSetQueryFragments(rest);
        const { email, firstName, lastName, active } = rest;
        const editUserResponse = await sequelize.query(
            `update users
          set ${setQueryFragments.join(', ')}
          where id = :userId`,
            {
                raw: true,
                type: Sequelize.QueryTypes.UPDATE,
                replacements: { userId, email, firstName, lastName, active }
            }
        );

        if (roleId) {
            const editRolesResponse = await sequelize.query(
                `update userRoles set roleId = :roleId where userId = :userId`,
                {
                    raw: true,
                    type: Sequelize.QueryTypes.UPDATE,
                    replacements: { userId, roleId },
                }
            )
        }
    }
    static async verifyUserAndSetPassword(token, passwordHash) {
        // TODO: Add handling if decode fails...
        const decodedToken = jwt.decode(token, process.env.REACT_APP_SECRET);
        if (!decodedToken) {
            throw new Error('Could not decode provided token');
        }
        const user = await ConnectMySqlRepository.getUserByEmail({
            email: decodedToken.user.email,
        });
        const isVerified = user &&
            moment(user.passwordExpiration).isAfter(moment());
        if (isVerified) {
            const userData = {
                passwordHash,
                roleId: user.prescribedRoleId,
            };
            await ConnectDataService.editUser(user.id, userData);

            const updatedUser = await ConnectMySqlRepository.getUserById({userId: user.id});
            const tokenizedUser = createJwtToken(updatedUser);

            return {message: `Password successfully changed for ${user.email}`, token: tokenizedUser};
        } else {
            throw new Error('Password reset link is expired.');
        }
    }
    static async getUserByEmail({ email }) {
        const user = await sequelize.query(
            'select * from users where email = :email limit 1',
            {
                raw: true,
                type: Sequelize.QueryTypes.SELECT,
                replacements: { email }
            });
        return user[0];
    }
    static async getUserById({ userId }) {
        const user = await sequelize.query(
            'select * from users where id = :userId limit 1',
            {
                raw: true,
                type: Sequelize.QueryTypes.SELECT,
                replacements: { userId }
            });
        return user[0];
    }
}
*/
