import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Header";
import Words from "./components/Words_List";
import Search from "./components/Search";
//notistack is a notification library to display notifications on your web apps
import { SnackbarProvider } from "notistack";
import { handleInitialData } from "./actions/list_action";

const theme = createTheme({
  typography: {
    fontFamily: "'Kumbh Sans', sans-serif",
  }
})

class App extends Component {

  //componentDidMount is the part of initialization where can get displayed all the words list that were initialized.
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    return (
      //Theme provider takes in a prop called theme , this props takes an object where We can add any property for styled components.
      
      //Snackbarprovider:- wrap all components that should display snackbars with the SnackbarProvider component, e.g. by wrapping 
      //your router with it.
      <ThemeProvider theme={theme}>
       <SnackbarProvider
       //anchorOrigin is used to set the position of the popover(alert box) used from material-ui
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >  
          <BrowserRouter>
            <Switch>
              <Route exact path='/'>
                <Header />
                <Words text="Words List" />
              </Route>
              <Route path='/search'>
                <Search />
              </Route>
            </Switch>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (words) => {
  return {
    words
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)