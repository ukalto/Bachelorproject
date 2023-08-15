import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();

    const routeChange = (path) => {
        switch (path) {
            case 1:
                navigate(`chord-system`)
                break;
            case 2:
                navigate(`berkeley`)
                break;
            case 3:
                navigate(`diffie-hellman`)
                break;
            case 4:
                navigate(`greedy`)
                break;
            default:
                break;
        }
    }

    return (
        <HomeContainer>
            <InfoField>
                This is a big information field
                This is a big information field
                This is a big information field
                This is a big information field
                This is a big information field
            </InfoField>
            <ButtonGrid>
                <BigButton onClick={() => routeChange(1)}>P2P</BigButton>
                <BigButton onClick={() => routeChange(2)}>CS</BigButton>
                <BigButton onClick={() => routeChange(3)}>KEM</BigButton>
                <BigButton onClick={() => routeChange(4)}>SP</BigButton>
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
`;

const InfoField = styled.div`
  background-color: white;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 100px;
  border-radius: 10px;
  border: solid 2px var(---error);
  box-shadow: var(---shadow);
  position: relative;
`;



const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
`;

const BigButton = styled.button`
  width: 100%;
  padding: 20px;
  font-size: 100px;
  background-color: var(---primary); /* Make sure to define these variables in your CSS */
  border-radius: 10px;
  border: solid 2px var(---secondary);
  color: var(---tertiary);
  box-shadow:
            -10px -10px 15px -3px rgba(46, 41, 51, 0.08),
            10px -10px 15px -3px rgba(46, 41, 51, 0.08),
          -10px 10px 15px -3px rgba(46, 41, 51, 0.08),
          10px 10px 15px -3px rgba(46, 41, 51, 0.08),
          0 10px 15px -3px rgba(46, 41, 51, 0.08),
          0 4px 6px -2px rgba(71, 63, 79, 0.16);
  cursor: pointer;
`;
