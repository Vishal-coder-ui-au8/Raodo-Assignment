//Fragment is a replace of <div> where fragment works faster than <div> while rendering multiple items.
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import WordCard from "./Word_Card";
import WordDetail from "./Word_Detail";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import debounce from "lodash.debounce";
import { handleInitialData } from "../actions/list_action";

class Search extends Component {
    state = {
        input: '',
        searchResult: [],
        openDetailModal: false,
        modalData: {}
    }

    //debounce fn  which delays the given fn until the given waiting time has passed
    setInput = debounce((input) => {
        this.setState({ input })
        //make a filter more specialized and characters that define a pattern of text to be matched
        const expression = `.*${this.state.input}.*`
        const regex = new RegExp(expression, "g");
        const searchResult = this.props.words.filter(word => word.word.match(regex))
        this.setState({ searchResult })
        //if found when comparing the given input and search result
        if (this.state.input === '') this.setState({ searchResult: [] })
    }, 1000)

    //task:- a model appears to search the wordlist by clicking on search option
    // new state update depends on the previous state, we use the functional form of setState which accepts as argument a function that returns a new state.
    toggleModal() {
        this.setState(prevState => ({
            openDetailModal: !prevState.openDetailModal
        }))
    }
    
    //to handle the page to next procedure by clicking on the displayed words
    handleClick(wordName) {
        const modalData = this.props.words.filter(word => word.word === wordName)[0]
        console.log(modalData)
        this.setState({ modalData })
        this.toggleModal()
    }

    render() {
        const words = this.state.searchResult
        const { openDetailModal, modalData } = this.state

        return (
            <Fragment>
                <div className="header" >
                    <input
                        type="text"
                        className="searchInput"
                        placeholder="Search"
                        onChange={e => this.setInput(e.target.value)}
                    />
                    <Link to='/'>
                        <IconButton aria-label="close" color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </Link>
                </div>
                <div className="container">
                    <div className="word-container">
                        {/* Mapping to display the word you are searching */}
                        {/* Mapping present information in a visual way.  */}
                        {words.map(word => (
                            <WordCard key={word.word} handleClick={() => this.handleClick(word.word)} word={word} />
                        ))}
                    </div>

                    {/* by clicking on the displayed word it will opens a new modal having detail of the word */}
                    <WordDetail word={modalData} handleClose={this.toggleModal.bind(this)} open={openDetailModal} />
                </div>
            </Fragment>
        )
    }
}

//mapStateToProps is used for selecting the part of the data from the store that the connected component needs
// The argument mentioned as words is the entire redux store state
const mapStateToProps = (words) => {
    return {

        //returning an object which contains the data
        words
    }
}

//Tha above fn passed as a first argument to connect and will be called every time when the redux store changes
//The second argument handleInitialData if not written also it will receive dispatch by default. Dispatch is the way to trigger 
//the state changes

export default connect(mapStateToProps, { handleInitialData })(Search)