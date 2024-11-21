import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../../../public/css/About.css';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Juan Pérez',
      role: 'Fundador y Chef Principal',
      description: 'Con más de 15 años de experiencia en la cocina, Juan es el corazón y el alma de Parcerottis.',
      image: 'assets/pan.jpg',
    },
    {
      name: 'María Gómez',
      role: 'Gerente de Operaciones',
      description: 'María asegura que todo funcione a la perfección en Parcerottis.',
      image: '/assets/pan.jpg',
    },
  ];

  return (
    <Container className="about-us-container">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-5 bg-light"
      >
        <h1 className="display-4">Sobre Nosotros</h1>
        <p className="lead">Nuestra pasión por la comida italiana</p>
      </motion.div>

      {/* About Section */}
      <Row className="my-5 align-items-center">
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Nuestra Historia</h2>
            <p>
              Fundada en 2020, Parcerottis nació del amor por la comida italiana y el deseo de compartirla con nuestra
              comunidad. Comenzamos como un pequeño negocio familiar en San Cristóbal, Antioquia, y rápidamente nos
              hicimos un nombre gracias a la calidad y el sabor incomparable de nuestros pancerottis y palitos.
            </p>
          </motion.div>
        </Col>
        <Col md={6}>
          <motion.img
            src="/FrontEndPedivex/public/assets/About/pan.jpg"
            className="img-fluid rounded shadow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        </Col>
      </Row>

      {/* Mission Section */}
      <Row className="my-5 mission-section">
        <Col>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-center mb-4">Nuestra Misión</h2>
            <Card>
              <Card.Body>
                <Card.Text>
                  En Parcerottis, nuestra misión es transformar cada experiencia culinaria en un viaje sensorial 
                  que celebre la autenticidad de la cocina italiana. Nos comprometemos a:

                  <ul className="mission-list">
                    <li>Ofrecer productos artesanales de la más alta calidad</li>
                    <li>Preservar las técnicas tradicionales de preparación</li>
                    <li>Crear momentos únicos a través de sabores excepcionales</li>
                    <li>Fomentar una conexión genuina entre nuestros clientes y la gastronomía italiana</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Vision Section */}
      <Row className="my-5 vision-section">
        <Col>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-center mb-4">Nuestra Visión</h2>
            <Card>
              <Card.Body>
                <Card.Text>
                  Visualizamos a Parcerottis como un referente culinario líder, reconocido por:

                  <ul className="vision-list">
                    <li>Ser la marca más prestigiosa de comida italiana en la región</li>
                    <li>Expandir nuestra presencia a nivel nacional e internacional</li>
                    <li>Innovar constantemente en técnicas y combinaciones de sabores</li>
                    <li>Crear una comunidad apasionada por la auténtica cocina italiana</li>
                    <li>Ser un modelo de sostenibilidad y responsabilidad social en la gastronomía</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="my-5 text-center">
        <Col>
          <h2>Nuestro Equipo</h2>
        </Col>
      </Row>
      <Row>
        {teamMembers.map((member, index) => (
          <Col md={6} key={index} className="mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <Card>
                <Card.Img variant="top" src={member.image} className="team-image" />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                  <Card.Text>{member.description}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutUs;