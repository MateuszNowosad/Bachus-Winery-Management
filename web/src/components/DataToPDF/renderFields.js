import React from 'react'
import {ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Typography} from '@material-ui/core'

const renderFields = (data, tableName,fieldNames, handleToggle) => {
    if (tableName !== '' && data.length !== 0)
        return data[0].fields.map(field => (
            <ListItem key={field.name}>
                <ListItemText
                    primary={field.name}
                    secondary={field.name}
                />
                <ListItemSecondaryAction>
                    <Checkbox
                        onChange={handleToggle(field.name)}
                        checked={fieldNames.indexOf(field.name) !== -1}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        ));
    else if(tableName === '') {
        return <ListItem>
            <Typography>Nie wybrano tabeli</Typography>
        </ListItem>
    }
    else {
        return <ListItem>
            <Typography>Nie ma takiej tabeli w bazie</Typography>
        </ListItem>
    }
};

export default renderFields;