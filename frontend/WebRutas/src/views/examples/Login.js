import DataAccess from "../../DataAccess/DataAccess.js";
import React, { useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,

} from "reactstrap";

const Login = () => {
  
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const usuario = document.getElementById("user").value;
    const contraseña = document.getElementById("password").value;
    
    try {
      const response = await DataAccess.loginGet("Sibel", "Usuarios", `LoginUsuario?usu=${usuario}&Pass=${contraseña}`);
      sessionStorage.setItem("token", response.token);
      // Redirige al usuario a la página de inicio después de iniciar sesión
      window.location.href = "/admin/index.html";
    } catch (error) {
      setError("Usuario o contraseña incorrectos"); 
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
        
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa-regular fa-user" /> 
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="user"
                    placeholder="Usuario"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Recordarme</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={handleLogin}>
                  Iniciar
                </Button>
                {error && <p className="text-danger">{error}</p>}
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>¿Olvidé mi contraseña?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};


export default Login;
