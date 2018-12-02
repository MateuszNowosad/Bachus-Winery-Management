import React, {Fragment} from 'react'
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Typography, Collapse, List} from '@material-ui/core'

const nestedList = (field, handleToggle, nestedFieldNames, classes) => {

    return field.type.fields.map(nestedField => {
            if (nestedField.type.fields === null)
                return (
                    <ListItem key={nestedField.name} className={classes.nestedList}>
                        <ListItemText
                            primary={nestedField.name}
                        />
                        <ListItemSecondaryAction>
                            <Checkbox
                                onChange={handleToggle(field, nestedField.name,true)}
                                checked={nestedFieldNames === undefined ? false : nestedFieldNames[field.name].indexOf(nestedField.name) !== -1}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            else return null;
        }
    );
};

const renderFields = (data, tableName, fieldNames, handleToggle, classes) => {
    if (tableName !== '' && data.length !== 0)
        return data[0].fields.map(field => {
                if (field.type.fields === null)
                    return (
                        <ListItem key={field.name}>
                            <ListItemText
                                primary={field.name}
                            />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    onChange={handleToggle(field.name)}
                                    checked={fieldNames.indexOf(field.name) !== -1}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                else {
                    const nestedFieldNames = fieldNames[fieldNames.findIndex(i => i[field.name])];
                    return (
                        <Fragment key={field.name}>
                            <ListItem>
                                <ListItemText
                                    primary={field.name}
                                />
                            </ListItem>
                            <List
                                dense
                            >
                                {nestedList(field, handleToggle, nestedFieldNames, classes)}
                            </List>
                        </Fragment>
                    );
                }
            }
        );
    else if (tableName === '') {
        return <ListItem>
            <Typography>Nie wybrano tabeli</Typography>
        </ListItem>
    } else {
        return <ListItem>
            <Typography>Nie ma takiej tabeli w bazie</Typography>
        </ListItem>
    }
};

export default renderFields;