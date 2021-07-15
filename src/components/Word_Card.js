import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default function Word_Card(props) {
    return (
        <Card>
            <CardActionArea onClick={props.handleClick}>
                <CardContent>
                    {/* mapping the details of the particular word */}
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.word.word}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div">
                        {props.word.entries && props.word.entries.map((entry, index) => (
                            <p style={{ marginTop: 10 }} key={index}>({entry.partOfSpeech}) {entry.definitions[0]}</p>
                        ))}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
