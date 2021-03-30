/*
    NAVIGATION BAR
*/
import Navbar from 'react-bootstrap/Navbar'
import { useHistory } from 'react-router';

export default function NavBar() {
    const history = useHistory();
    return (
        <Navbar bg="light">
            <Navbar.Brand onClick={() => history.push('/')}>Bus Board</Navbar.Brand>
        </Navbar>
    );
}