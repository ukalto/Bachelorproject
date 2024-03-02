import React, {useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();

    const [options] = useState([
        {
            label: "Peer2Peer Systems",
            subOptions: [["Chord System", "chord-system"], ["Polymorph Polyring", "polymorph-polyring"]],
        },
        {
            label: "Clocks && Synchronisation",
            subOptions: [["Berkeley", "berkeley"], ["Lamport's Logical Clocks", "lamports-logical-clocks"], ["Vector Clock", "vector-clock"]],
        },
        {
            label: "Key-Exchange && Messaging",
            subOptions: [["Diffie Hellman", "diffie-hellman"], ["Crypto System", "crypto-system"]],
        },
        {
            label: "Server-Placement",
            subOptions: [["Greedy", "greedy"]],
        },
    ]);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleSubOptionClick = (path) => {
        navigate(path);
    };

    const clearSelection = () => {
        setSelectedOption(null);
    };

    return (
        <HomeContainer>
            <InfoField>
                This <u>Bachelorproject</u> simulates various <u>Distributed System Algorithms</u> which are explained through
                scenarios and include benchmarks, serving as an educational tool to explain these concepts.
            </InfoField>
            <ButtonGrid>
                {selectedOption ? (
                    <Overlay onClick={clearSelection}>
                        <SubButtonGrid>
                            {selectedOption.subOptions.map(([name, path], index) => (
                                    <BigButton
                                        key={index}
                                        onClick={() => handleSubOptionClick(path)}
                                    >
                                        {name}
                                    </BigButton>
                                )
                            )}
                        </SubButtonGrid>
                    </Overlay>
                ) : (
                    options.map((option, index) => (
                        <BigButton
                            key={index}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </BigButton>
                    ))
                )}
            </ButtonGrid>
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => (props.isOverlayVisible ? "rgba(0, 0, 0, 0.5)" : "transparent")};
  position: relative;
`;

const InfoField = styled.div`
  background-color: white;
  text-align: center;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 100px;
  border-radius: 10px;
  border: solid 2px var(---error);
  box-shadow: var(---shadow);
  position: relative;
  
  u {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    u {
      font-size: 16px
    }
  }


`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    padding-bottom: 16px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const SubButtonGrid = styled.div`
  display: grid;
  margin-top: 40px;
  width: 70%;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const BigButton = styled.button`
  width: 100%;
  padding: 20px;
  font-size: 60px;
  background-color: var(---primary); /* Make sure to define these variables in your CSS */
  border-radius: 10px;
  border: solid 2px var(---secondary);
  color: var(---tertiary);
  box-shadow: -10px -10px 15px -3px rgba(46, 41, 51, 0.08),
    10px -10px 15px -3px rgba(46, 41, 51, 0.08),
  -10px 10px 15px -3px rgba(46, 41, 51, 0.08),
  10px 10px 15px -3px rgba(46, 41, 51, 0.08),
  0 10px 15px -3px rgba(46, 41, 51, 0.08),
  0 4px 6px -2px rgba(71, 63, 79, 0.16);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;


  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 1000px) {
    font-size: 30px;
  }
  @media (max-width: 1400px) and (min-width: 1001px){
    font-size: 50px;
  }
`;
