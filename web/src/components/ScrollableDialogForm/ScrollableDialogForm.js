import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import ScrollableDialogFormStyle from '../../assets/jss/common/components/ScorllableDialogFormStyle.js';
import Button from '@material-ui/core/Button/Button';
import UniversalSubmitHander from '../../views/common/forms/UniversalSubmitHandler';
import OCSnackbar from '../../views/common/prompts/OCSnackbar';
import ConfirmationSlide from './ConfirmationSlide';
import { Mutation } from 'react-apollo';
import { selectUpsertForForm } from '../../mutations/FormMutations/selectUpsertForForm';

class ScrollableDialogForm extends React.Component {
  state = {
    submit: false,
    openSnackbar: false,
    openConfirmationPrompt: false,
    dynamicVariables: '',
    dynamicVariablesCount: ''
  };

  handleStage = () => {
    this.setState({ openConfirmationPrompt: true });
  };
  handleUnstage = () => {
    this.setState({ openConfirmationPrompt: false });
  };

  handleSubmit = () => {
    this.setState({ submit: true, openConfirmationPrompt: false });
  };

  formSubmitted = () => {
    this.setState({ submit: false, openSnackbar: true });
    this.handleClose();
  };

  submitAborted = () => {
    this.setState({ submit: false });
  };

  handleClose = () => {
    this.setState({ openConfirmationPrompt: false });
    this.props.closeForm();
  };

  handleMutationDynamiData = data => {
    let count = {};
    for (let property in data) {
      count[property] = data[property].length;
    }
    this.setState({
      dynamicVariables: data,
      dynamicVariablesCount: count
    });
  };

  render() {
    const { classes, children, dialogTitle, open, query } = this.props;
    const { openConfirmationPrompt, openSnackbar, submit } = this.state;
    return (
      <div>
        <Dialog
          aria-labelledby="modal-form-popup"
          aria-describedby="modal-form-popup"
          open={open}
          onClose={this.handleClose}
          className={classes.dialog}
          scroll="body"
          fullWidth={true}
          maxWidth={'lg'}
        >
          <DialogContent>
            <DialogTitle>{dialogTitle}</DialogTitle>
            {open &&
              (selectUpsertForForm(children.type.name).simple === 0 ? (
                <Mutation
                  mutation={selectUpsertForForm(children.type.name, this.state.dynamicVariablesCount).fkQuery}
                  onCompleted={this.formSubmitted}
                  refetchQueries={[{ query: query }]}
                  onError={error => console.log('71, error jakub: ', error)}
                >
                  {mutate => (
                    <Mutation
                      mutation={selectUpsertForForm(children.type.name).query}
                      onCompleted={result => {
                        console.log('75, result jakub: ', result);
                        let variables = {};
                        Object.values(result).forEach(value => {
                          for (let i = 0; i < Object.keys(value).length - 1; i++) {
                            let key = Object.keys(value)[i];
                            variables[key] = value[key];
                          }
                        });
                        const { dynamicVariables } = this.state;
                        //let done = true;
                        if (dynamicVariables) {
                          // done = false;
                          let count = {};
                          if (dynamicVariables.content) {
                            // count.content = dynamicVariables.content.length;
                            for (let i = 0; i < dynamicVariables.content.length; i++) {
                              variables[`parcelJTId${i}`] = dynamicVariables.content[i].parcelJTId;
                              variables[`idItemInStock${i}`] = `${dynamicVariables.content[i].key}`;
                              variables[`idItemInStock${i}FK`] = `${dynamicVariables.content[i].key}`;
                              variables[`amount${i}`] = `${dynamicVariables.content[i].amount}`;
                              variables[`newAmount${i}`] = Number(
                                (
                                  dynamicVariables.content[i].previousAmount -
                                  dynamicVariables.content[i].amount +
                                  0.1
                                ).toFixed(1)
                              );
                            }
                          }
                          if (dynamicVariables.contentToDelete) {
                            // count.content = dynamicVariables.content.length;
                            for (let i = 0; i < dynamicVariables.contentToDelete.length; i++) {
                              variables[`parcelJTDeleteId${i}`] = dynamicVariables.contentToDelete[i].parcelJTId;
                              variables[`idRestoreItemInStock${i}`] = `${dynamicVariables.contentToDelete[i].key}`;
                              variables[`initAmount${i}`] = Number(
                                (dynamicVariables.contentToDelete[i].previousAmount + 0.1).toFixed(1)
                              );
                            }
                          }
                          if (dynamicVariables.batches) {
                            //count.batches = dynamicVariables.batches.length;
                            for (let i = 0; i < dynamicVariables.batches.length; i++) {
                              variables[`batchJTId${i}`] = dynamicVariables.batches[i].batchJTId;
                              variables[`idBatch${i}`] = `${dynamicVariables.batches[i].key}`;
                              variables[`amountBatch${i}`] = `${dynamicVariables.batches[i].amount}`;
                            }
                          }
                          if (dynamicVariables.item) {
                            // count.item = dynamicVariables.item.length;
                            for (let i = 0; i < dynamicVariables.item.length; i++) {
                              variables[`itemJTId${i}`] = dynamicVariables.item[i].itemJTId;
                              variables[`idItemInStock${i}`] = `${dynamicVariables.item[i].key}`;
                              variables[`amountItem${i}`] = `${dynamicVariables.item[i].amount}`;
                            }
                          }
                          if (dynamicVariables.jtId)
                            for (let id in dynamicVariables.jtId) {
                              variables[id] = `${dynamicVariables.jtId[id]}`;
                            }
                          console.log('100, variables jakub: ', variables);
                          console.log('124, count jakub: ', this.state.dynamicVariablesCount);
                          //this.setState({ dynamicVariablesCount: count }, () => (done = true));
                        }
                        //if (done)
                        mutate({ variables: variables });
                        // else console.log('130, done jakub: ', done);
                      }}
                    >
                      {mutation => {
                        return React.cloneElement(children, {
                          submitFromOutside: submit,
                          onSubmit: UniversalSubmitHander,
                          //formSubmitted: this.formSubmitted,
                          submitAborted: this.submitAborted,
                          mutation: mutation,
                          setMutationDynamicVariables: this.handleMutationDynamiData
                        });
                      }}
                    </Mutation>
                  )}
                </Mutation>
              ) : (
                <Mutation
                  mutation={selectUpsertForForm(children.type.name).query}
                  onCompleted={this.formSubmitted}
                  refetchQueries={[{ query: query }]}
                >
                  {mutation => {
                    return React.cloneElement(children, {
                      submitFromOutside: submit,
                      onSubmit: UniversalSubmitHander,
                      //formSubmitted: this.formSubmitted,
                      submitAborted: this.submitAborted,
                      mutation: mutation
                    });
                  }}
                </Mutation>
              ))}
          </DialogContent>
          <DialogActions classes={{ root: classes.root }}>
            {openConfirmationPrompt ? (
              <ConfirmationSlide
                dialogMessage={'Czy na pewno chcesz dodać ten wpis do bazy danych?'}
                handleAgree={this.handleSubmit}
                handleCancel={this.handleUnstage}
                open={openConfirmationPrompt}
              />
            ) : (
              <React.Fragment>
                <Button variant="contained" onClick={this.handleClose} color="secondary">
                  Anuluj
                </Button>
                <Button variant="contained" onClick={this.handleStage} color="primary">
                  Zapisz
                </Button>
              </React.Fragment>
            )}
          </DialogActions>
        </Dialog>
        <OCSnackbar message={'Zapisano zmiany do bazy danych'} open={openSnackbar} />
      </div>
    );
  }
}

ScrollableDialogForm.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  openForm: PropTypes.func.isRequired
};

export default withStyles(ScrollableDialogFormStyle)(ScrollableDialogForm);
