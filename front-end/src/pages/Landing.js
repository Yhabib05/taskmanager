import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo/Logo";
import { Link } from "react-router-dom";
import landingPage from "../assets/images/landingPage.svg"; // Import the landing image

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                {/* Info Section */}
                <div className="info">
                    <h1>
                        Task <span>Flow</span>
                    </h1>
                    <p>
                        Our tool help you manage your tasks, and collaborate effectively with your team.
                    </p>

                    <Link to="/Login" className="btn btn-hero">
                        Login/Register
                    </Link>
                </div>
                <img src={landingPage} alt="Task Flow Illustration" className="img main-img" />
            </div>
        </Wrapper>
    );
};

export default Landing;

const Wrapper = styled.main`
    nav {
        width: 100%; /* Adjusts the nav width */
        max-width: 1320px; /* Limits the nav container's width */
        margin: 0 auto;
        height: 60px; /* Height of the nav bar */
        display: flex;
        align-items: center;
        justify-content: flex-start; 
    }

  .page {
    min-height: calc(100vh - 80px); /* Full height minus nav */
    display: grid;
    align-items: center;
    margin-top: -3rem;
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem;
  }

  h1 {
    font-weight: 700;
    font-size: 2.5rem;
    span {
      color: #4daffb; /* Primary color */
    }
  }

  p {
    color: #6b7280; /* Neutral grey text color */
    font-size: 1.2rem;
    line-height: 1.5;
    margin: 1rem 0;
  }

  .btn-hero {
    background-color: #4daffb; /* Primary color */
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .btn-hero:hover {
    background-color: #3c98d1; /* Darker shade for hover */
  }

  .main-img {
    width: 100%;
    max-width: 550px;
    height: auto;
    margin-top: 2rem;
    display: block;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr; /* Two-column layout */
      text-align: left;
      column-gap: 3rem;
    }

    .main-img {
      margin-top: 0;
    }
  }
`;
