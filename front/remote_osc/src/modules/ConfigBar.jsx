import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import gearImage from "../resources/gear.png";
import Stack from "react-bootstrap/Stack";
import "../Disp.css";
import oscConfigService from "../services/oscConfigService";

function ConfigBar({ setTimeDivDisplay, setAmpDivDisplay }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let jsonConfig = {}

  const handleNewTimeDiv = (newTimeDiv) => {
    oscConfigService.getAll().then((configResponse) => {
      jsonConfig = configResponse.data
      oscConfigService.update(newTimeDiv, jsonConfig.ampDiv).then((response) => {
        setTimeDivDisplay(response.data.timeDiv)
      })
    })
  }
  const handleNewAmpDiv = (newAmpDiv) => {
    oscConfigService.getAll().then((configResponse) => {
      jsonConfig = configResponse.data
      oscConfigService.update(jsonConfig.timeDiv, newAmpDiv).then((response) => {
        setAmpDivDisplay(response.data.ampDiv)
      })
    })
  }


  return (
    <>
      <Stack direction="horizontal" gap={3} className="bg-dark p-2">
        <div className="text-white">
          <h3>Remote Oscilloscope</h3>
        </div>
        <div className="p-2 ms-auto">
          {" "}
          <Button variant="dark" onClick={handleShow}>
            <img src={gearImage} alt="gear" width="30" height="30" />
          </Button>
        </div>
      </Stack>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="text-white">
            Configuracion
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h4>Coupling</h4>
          <Stack direction="horizontal" gap={2}>
            <div className="text-white">
              <div className="p-2 ms-auto">
                {" "}
                <Button variant="dark">DC</Button>
              </div>
            </div>
            <div className="p-2 ms-auto">
              {" "}
              <Button variant="dark">AC</Button>
            </div>
          </Stack>
          <h4>Time-Division</h4>
          <Stack direction="horizontal" gap={4}>
            <div className="text-white">
              <div className="p-2 ms-auto">
                {" "}
                <Button
                  variant="dark"
                  onClick={() => {
                    handleNewTimeDiv(0.1)
                  }}
                >
                  0.1s
                </Button>
              </div>
            </div>
            <div className="p-2 ms-auto">
              {" "}
              <Button
                variant="dark"
                onClick={() => {
                  handleNewTimeDiv(0.05);
                }}
              >
                50ms
              </Button>
            </div>
            <div className="p-2 ms-auto">
              {" "}
              <Button
                variant="dark"
                onClick={() => {
                  handleNewTimeDiv(0.005);
                }}
              >
                500us
              </Button>
            </div>
          </Stack>
          <h4>Amplitud Division</h4>
          <Stack direction="horizontal" gap={4}>
            <div className="text-white">
              <div className="p-2 ms-auto">
                {" "}
                <Button
                  variant="dark"
                  onClick={() => {handleNewAmpDiv(0.01*5)}}>
                  1mv
                </Button>
              </div>
            </div>
            <div className="p-2 ms-auto">
              {" "}
              <Button
                variant="dark"
                onClick={() => {
                  {handleNewAmpDiv(0.1*5)}
                }}
              >
                100mv
              </Button>
            </div>
            <div className="p-2 ms-auto">
              {" "}
              <Button
                variant="dark"
                onClick={() => {
                  {handleNewAmpDiv(5)}
                }}
              >
                1v
              </Button>
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ConfigBar;
