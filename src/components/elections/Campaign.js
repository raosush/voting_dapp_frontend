import React, { Component } from 'react'
import { fetchElections } from "../../services/elections/electionService";
import { Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import "placeholder-img.jpg";

export default class Campaign extends Component {

    render() {
        return (
            <section className="campaign-card">
                <img id="profile-pic" src="./placeholder-img.jpg" alt="" />
                <h1>Candidate Name</h1>
                <h2>Our Vision</h2>
                
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ut voluptatum maiores earum,
                    quo aspernatur architecto laudantium fugiat repellat? Asperiores maxime quas eaque doloribus 
                    laborum, fugiat placeat eius, magnam deserunt nulla dolor iste suscipit, temporibus molestias 
                    totam dolore illum. Nihil, illum odio corrupti blanditiis vitae, delectus sunt quos illo 
                    voluptatibus minus aperiam dicta eveniet deleniti voluptate est! Harum quae ut tempore sint nulla 
                    amet ipsam, culpa nemo fugit debitis molestias at impedit eius asperiores adipisci natus iste 
                    ullam! Expedita, eveniet
                </p>
            </section>
        )
    }
}

