/* eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { selectors, setCurrentChannelId, getCurrentChannelId } from '../../../../store/channels';

const Channels = ({ handleOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector(getCurrentChannelId);

  const handleRename = (id) => handleOpen('renaming', id);
  const handleRemove = (id) => handleOpen('removing', id);

  const channelsList = () => {
    const elements = channels.map(({ name, removable, id }) => {
      const btnClasses = cn('btn', {
        'btn-secondary': id === currentChannelId,
      });

      const variant = id === currentChannelId ? 'secondary' : 'light';

      if (!removable) {
        return (
          <li className="nav-item w-100" key={id}>
            <button
              type="button"
              onClick={() => dispatch(setCurrentChannelId(id))}
              className={`w-100 rounded-0 text-start ${btnClasses}`}
            >
              #
              {' '}
              {name}
            </button>
          </li>
        );
      }

      return (
        <li key={id}>
          <div role="group" className="d-flex dropdown btn-group">
            <Dropdown as={ButtonGroup} className="w-100">
              <Button
                variant={variant}
                className="text-start w-100 text-truncate"
                onClick={() => {
                  dispatch(setCurrentChannelId(id));
                }}
              >
                #
                {' '}
                {name}
              </Button>

              <Dropdown.Toggle
                split
                variant={variant}
                className="flex-grow-0 text-end"
              >
                <span className="visually-hidden">{t('channels.manage')}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleRemove(id)}>
                  {t('channels.remove')}
                </Dropdown.Item>
                <Dropdown.Item onClick={handleRename(id)}>
                  {t('channels.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
      );
    });

    return elements;
  };

  const handleAdd = () => handleOpen('adding');

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column  d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <Button
          onClick={handleAdd()}
          variant="link"
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelsList()}
      </ul>
    </Col>
  );
};

export default Channels;
