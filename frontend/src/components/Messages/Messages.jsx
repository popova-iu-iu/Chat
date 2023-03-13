import { useSelector, useDispatch } from "react-redux";
import { Form, Button, InputGroup } from "react-bootstrap";
import cn from "classnames";
import { actions as channelsActions } from "../../store/channelsSlice/slice";

const Header = () => {
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0 fw-bold"># ChannelName</p>
      <span className="text-muted">Text</span>
    </div>
  );
};

const Body = () => (
  <div id="messages-box" className="chat-messages overflow-auto px-5">
    MessageList
  </div>
);

const Footer = () => {
  return (
    <div className="mt-auto px-5 py-3">
      <div>
        <Form className="py-1 border rounded-2" >
          <InputGroup>
            <Form.Control
              className="border-0 p-0 ps-2"
              name="message"
              placeholder="Placeholder"
            />

            <Button
              type="submit"
              variant="link"
              className="btn-group-vertical text-dark"
            ></Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

const Messages = () => {
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <Header />
        <Body />
        <Footer />
      </div>
    </div>
  );
};

export default Messages;
