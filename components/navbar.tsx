import { Container, Navbar as BootstrapNavBar } from 'react-bootstrap';

export default function Navbar() {
  return (
    <Container>
      <BootstrapNavBar expand="lg" bg="light">
        <Container>navbar</Container>
      </BootstrapNavBar>
    </Container>
  );
}
