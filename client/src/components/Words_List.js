import React, { Component } from "react";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import WordCard from "./Word_Card";
import WordDetail from "./Word_Detail";
import AddWordModal from "./Add_Word";
import { handleInitialData } from "../actions/list_action";

class Words_List extends Component {
    state = {
        openDetailModal: false,
        openAddWordModal: false,
        modalData: {}
    }
    // new state update depends on the previous state, we use the functional form of setState which accepts as argument a function that returns a new state.
    toggleAddNewWordModal() {
        this.setState(prevState => ({
            openAddWordModal: !prevState.openAddWordModal
        }))
    }
    // new state update depends on the previous state, we use the functional form of setState which accepts as argument a function that returns a new state.
    toggleModal() {
        this.setState(prevState => ({
            openDetailModal: !prevState.openDetailModal
        }))
    }

    handleClick(wordName) {
        const modalData = this.props.words.filter(word => word.word === wordName)[0]
        console.log(modalData)
        this.setState({ modalData })
        this.toggleModal()
    }

    render() {
        const { words } = this.props
        const { openDetailModal, modalData, openAddWordModal } = this.state

        return (
            <div className="container">
                <h4 className="heading">{this.props.text}</h4>
                <Divider />
                <div className="word-container">
                    {/* mapping to go to the particular page while clicking on the element */}
                    {words.map(word => (
                        <WordCard key={word.word} handleClick={() => this.handleClick(word.word)} word={word} />
                    ))}
                </div>
                {/* to open details page */}
                <WordDetail word={modalData} handleClose={this.toggleModal.bind(this)} open={openDetailModal} />
                {/* to open add form  */}
                <AddWordModal handleClose={this.toggleAddNewWordModal.bind(this)} open={openAddWordModal} />
                {/* Button to add new word */}
                <div className="addButton">
                    <IconButton onClick={() => this.toggleAddNewWordModal()} edge="end" color="inherit" aria-label="close">
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (words) => {
    return {
        words
    }
}

export default connect(mapStateToProps, { handleInitialData })(Words_List)