import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import gearImage from "../resources/gear.png";
import Stack from "react-bootstrap/Stack";
import "../Disp.css";
import oscConfigService from "../services/oscConfigService"
import oscFunctionService from "../services/oscFunctionService"
import { FaPlay } from "react-icons/fa";
import { AiOutlinePause } from "react-icons/ai";



const PauseIcon = ({ pauseIcon }) => {
  if (pauseIcon) {
    return (
      <>

        <FaPlay />
      </>
    )
  }
  else {
    return (
      <>
        <AiOutlinePause />
      </>
    )
  }
}

function ConfigBar({ setTimeDivDisplay, setAmpDivDisplay, setPause }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pauseIcon, setPauseIcon] = useState(false)

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
  const handleNewOffset = (newOffset) => {
    oscFunctionService.getAll().then((funcResponse) => {
      const prevOffset = funcResponse.data.offset
      oscFunctionService.update(newOffset + prevOffset).then((response) => {
        console.log(response.data)
      })
    })
  }

  const handlePause = () => {
    setPause(prevPause => !prevPause);
    setPauseIcon(prevPauseIcon => !prevPauseIcon)
  }
  return (
    <>
      <div style={{ marginBottom: '20px' }}>
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
      </div>
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
            <div className="p-2</Stack> ms-auto">
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
                  onClick={() => { handleNewAmpDiv(0.01 * 5) }}>
                  1mv
                </Button>
              </div>
            </div>
            <div className="p-2 ms-auto">
              {" "}
              <Button
                variant="dark"
                onClick={() => {
                  { handleNewAmpDiv(0.1 * 5) }
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
                  { handleNewAmpDiv(5) }
                }}
              >
                1v
              </Button>
            </div>
          </Stack>
          <Stack direction="horizontal" gap={2}>
            <h4>Pause</h4>
            <h4>Offset</h4>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <Button variant="dark" onClick={handlePause}>
              <PauseIcon pauseIcon={pauseIcon} />
            </Button>
            <Stack direction="vertical" gap={3}>

              <Button variant="dark" onClick={() => { handleNewOffset(0.5) }}>
                arriba
              </Button>
              <Button variant="dark" onClick={() => { handleNewOffset(-0.5) }}>
                abajo
              </Button>
            </Stack>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ConfigBar;
