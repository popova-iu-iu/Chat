import { useSelector, useDispatch } from "react-redux";
import { Col, ButtonGroup, Dropdown, Button, Nav } from "react-bootstrap";
import cn from "classnames";
import { actions as channelsActions } from "../../store/channelsSlice/slice";

const Channels = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const activeChannel = () => {
    const channel = channels.find((channel) => channel.id === currentChannelId);
    return channel;
  };

  const renderChannels = () => {
    const elements = channels.map(({ id, name, removable }) => {
      const channelCSS = cn("btn", {
        "btn-secondary": id === currentChannelId,
        "btn-light": id !== currentChannelId,
      });

      if (!removable) {
        return (
          <li key={id} className="nav-item w-100">
            <button
              onClick={() => dispatch(channelsActions.setCurrentChannelId(id))}
              type="button"
              className={`w-100 text-start rounded-0 ${channelCSS}`}
            >
              <span className="me-1">#</span>
              {name}
            </button>
          </li>
        );
      }
    });

    return (
      <Nav fill variant="pills" className="d-flex flex-column px-2" as="ul">
        {elements}
      </Nav>
    );
  };

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <Button
          variant="link"
          className="p-0 text-primary btn-group-vertical"
          onClick={() =>
            dispatch(
              channelsActions.addChannel({
                id: 3,
                name: "iulia",
                removable: false,
              })
            )
          }
        >
          Add channel
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      {renderChannels()}
    </Col>
    // <>
    //   <Button
    //     onClick={() =>
    //       dispatch(
    //         channelsActions.addChannel({
    //           id: 3,
    //           name: "iulia",
    //           removable: false,
    //         })
    //       )
    //     }
    //   >
    //     Add channel
    //   </Button>

    // </>
  );
};

//  {renderChannels()}

export default Channels;
