import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { FilePicker } from 'react-file-picker'
import loadFile from "./utils";
const defaultToolbarStyles = {
    iconButton: {
    },
};


class CustomToolbar extends React.Component {

    componentDidMount(){
    }


    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={"Upload CSV"}>
                    <FilePicker
                        extensions={['csv']}
                        onChange={file => (
                            loadFile(file).then(function(data){
                                var base64 = data.replace("data:text/csv;base64,","");
                                const jsonObj = { base64String: base64 };

                                fetch('https://36hidzapk7.execute-api.us-east-1.amazonaws.com/Prod/', {
                                    method: 'POST', // or 'PUT'
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(jsonObj),
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if(data.status == "OK"){
                                            window.location.reload();
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });
                            })
                        )}
                        onError={errMsg => alert(errMsg)}>
                            <IconButton className={classes.iconButton} onClick={this.handleClick}>
                            <AddIcon className={classes.deleteIcon} />
                            </IconButton>
                        </FilePicker>

                </Tooltip>
            </React.Fragment>
        );
    }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);