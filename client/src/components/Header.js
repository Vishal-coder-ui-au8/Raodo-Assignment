import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
//Typography is a Material-UI component used to standardize the text and its related CSS properties without worrying about browser 
//compatibility issues.
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";

export default function Header() {
    return (
        <div className="header">
            <Typography className="logo" variant="h6">
                Vocab
            </Typography>
            <Link to='/search'>
                <IconButton aria-label="search" color="inherit">
                    <SearchIcon />
                </IconButton>
            </Link>
        </div>
    )
}