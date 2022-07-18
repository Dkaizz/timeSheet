import { faCheck, faPlayCircle, faStopCircle, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import { requestTags } from '~/apiServices/tagsServices';
import { useValueContext } from '~/hooks';
import { addDataInput, editDataInput, setDataInput, useStore } from '~/store';

import tachmang from './tachmang';
import './header.scss';
import moment from 'moment';
import HeaderWrapper from '~/components/HeaderWrapper';

function Header() {
  const [displayStart, setDisplayStart] = useState('block');
  const [displayStop, setDisplayStop] = useState('none');

  const PStyled = styled.p`
    outline: none;
    min-width: 100px;
    max-width: 300px;
    max-height: 80px;
    overflow: auto;
    margin: 0;
  `;
  const SpanStyledWithIconStart = styled.span`
    display: ${displayStart};
  `;
  const SpanStyledWithIconStop = styled.span`
    display: ${displayStop};
  `;

  const DivStyledWithWrapperIcon = styled.div``;

  const PStyledWithTime = styled.p`
    margin: 0 25px;
  `;
  const DivStyledWithBolockTag = styled.div`
    display: none;
    position: absolute;
    min-width: 200px;
    border: 3px solid #333;
    background-color: #fff;
  `;

  const DivStyledWithTag = styled.div`
    position: relative;
    cursor: pointer;
    &:hover ${DivStyledWithBolockTag} {
      display: block;
    }
  `;

  const ButtonStyled = styled.button`
    width: 100%;
    text-align: left;
    padding: 5px;
    background: transparent;
    border-bottom: 2px solid #333;
  `;

  const [stateTasksPromise, dispatch] = useStore();
  const [tags, setTags] = useState();

  const contextVale = useValueContext();
  const [timer, setTimer] = useState(0);
  const { checkStart, setCheckStart } = contextVale.checkRun;
  const [checkEditable, setCheckEditable] = useState(true);
  const countRef = useRef();
  const TimePut = contextVale.timePut;
  const textRef = useRef();
  const checkTagPost = useRef(false);
  const tagPostRef = useRef([]);
  const taskRunning = contextVale.taskRunning;
  const [nameTask, setNameTask] = useState('What are you working on?');

  useEffect(() => {
    dispatch(setDataInput());
    return () => {
      // cleanup
    };
  }, [taskRunning, tagPostRef]);
  useEffect(() => {
    const fetchApi = async () => {
      const resultTasks = await stateTasksPromise.data;
      const resultTags = await requestTags();
      setNameTask('What are you working on?');
      taskRunning.current = undefined;
      setCheckStart(false);
      setCheckEditable(true);
      if (resultTasks) {
        for (const item of resultTasks) {
          if (item.status === 0) {
            setCheckEditable(false);
            console.log('arrTask:', item.time_spent);
            setCheckStart(true);
            setNameTask(item.description);
            taskRunning.current = item;
            if (item.time_spent) {
              const arrTime = item.time_spent.split(' ');
              const arrsaukhitach = tachmang(arrTime, 2);
              const obj = {};

              for (const arr of arrsaukhitach) {
                obj[arr[1]] = arr[0];
              }
              let hour = obj.hour ? obj.hour * 3600 : 0;
              let minute = obj.mins ? obj.mins * 60 : 0;
              let second = obj.seconds ? obj.seconds : 0;

              let time = Number(hour) + Number(minute) + Number(second);
              console.log('time của cái đang run:', time);
              setTimer(time);
            }
          }
        }
      }
      setTags(resultTags);
    };
    fetchApi();

    return () => {
      // cleanup
    };
  }, [nameTask, stateTasksPromise, taskRunning, setCheckStart, checkStart]);

  function countingTime() {
    countRef.current = setInterval(function () {
      setTimer(pre => pre + 1);
    }, 1000);
  }

  useEffect(() => {
    // effect

    if (checkStart) {
      countingTime();
      setDisplayStart('none');
      setDisplayStop('block');
    } else {
      clearInterval(countRef.current);
      setDisplayStart('block');
      setDisplayStop('none');
    }

    return () => {
      // cleanup
    };
  }, [checkStart]);

  function handleStart() {
    if (textRef.current.innerText !== 'What are you working on?') {
      setCheckStart(true);

      dispatch(
        addDataInput({
          description: textRef.current.innerText,
          start_time: moment().format('YYYY-MM-DD h:mm:ss'),
          end_time: null,
          time_spent: null,
          tags: tagPostRef.current,
          status: 0,
        })
      );
    }
    setNameTask(textRef.current.innerText);
    setTimeout(() => {
      dispatch(setDataInput());
    }, 0);
    console.log('text: ', textRef.current.innerText);
  }
  const handleStop = () => {
    if (textRef.current.innerText !== 'What are you working on?') {
      setCheckStart(false);

      dispatch(
        editDataInput(
          {
            ...taskRunning.current,
            end_time: moment().format('YYYY-MM-DD h:mm:ss'),
            time_spent: TimePut.current,
            status: 1,
          },
          taskRunning.current.id
        )
      );
      setTimeout(() => {
        TimePut.current = 0;

        dispatch(setDataInput());
      }, 0);
    }
  };
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    const hours = Math.floor(timer / 3600) !== 0 ? `${Math.floor(timer / 3600)} hours ` : '';
    const mins = Math.floor(timer / 60) % 60 !== 0 ? `${Math.floor(timer / 60) % 60} mins ` : '';
    const seconds = timer % 60 !== 0 ? `${timer % 60} seconds` : '';
    TimePut.current = hours + mins + seconds;
    // TimePut.current

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  function handleTagClick(e) {
    if (!taskRunning.current) {
      const value = e.target.value;
      if (e.target.dataset.check === 'false') {
        e.target.dataset.check = true;
        e.target.classList.add('tag_active');
        //click để thêm dữ liệu tag lúc post
        if (tagPostRef.current.length > 0) {
          for (let i = 0; i < tagPostRef.current.length; i++) {
            if (e.target.value !== tagPostRef.current[i]) {
              checkTagPost.current = true;
            } else {
              checkTagPost.current = false;
              break;
            }
          }
        } else {
          tagPostRef.current.push(Number(value));
        }
        if (checkTagPost.current) {
          tagPostRef.current.push(Number(value));
        }
      } else {
        e.target.dataset.check = false;
        e.target.classList.remove('tag_active');
        //click vào xóa dữ liệu tag để post
        for (let i = 0; i < tagPostRef.current.length; i++) {
          if (tagPostRef.current[i] === Number(value)) {
            tagPostRef.current.splice(i, 1);
          }
        }
      }
    }
  }

  function renderTags() {
    return (
      <>
        {tags &&
          tags.map((item, index) => {
            if (taskRunning.current) {
              if (taskRunning.current.tags.includes(item.id)) {
                return (
                  <ButtonStyled key={index} data-check={false} onClick={handleTagClick} value={item.id} className="tag_active">
                    <FontAwesomeIcon className="icon-check" icon={faCheck} /> {item.name}
                  </ButtonStyled>
                );
              }
            }
            return (
              <ButtonStyled key={index} data-check={false} onClick={handleTagClick} value={item.id}>
                <FontAwesomeIcon className="icon-check" icon={faCheck} /> {item.name}
              </ButtonStyled>
            );
          })}
      </>
    );
  }

  function handleFocus(e) {
    e.preventDefault();
    if (e.target.innerText === 'What are you working on?') {
      e.target.innerText = '';
    }
  }
  function handleBlur(e) {
    if (e.target.innerText.trim().length === 0) {
      e.target.innerText = 'What are you working on?';
    }
  }

  return (
    <HeaderWrapper>
      <h5
        className="text"
        ref={textRef}
        contentEditable={checkEditable}
        suppressContentEditableWarning={true}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {nameTask}
      </h5>
      <div className="d-flex align-items-center">
        <DivStyledWithTag>
          <FontAwesomeIcon icon={faTags} fontSize="30px" />
          <DivStyledWithBolockTag>{renderTags()}</DivStyledWithBolockTag>
        </DivStyledWithTag>
        <PStyledWithTime>{formatTime()}</PStyledWithTime>
        <DivStyledWithWrapperIcon>
          <SpanStyledWithIconStart onClick={handleStart}>
            <FontAwesomeIcon icon={faPlayCircle} fontSize="45px" />
          </SpanStyledWithIconStart>
          <SpanStyledWithIconStop onClick={handleStop}>
            <FontAwesomeIcon icon={faStopCircle} fontSize="45px" />
          </SpanStyledWithIconStop>
        </DivStyledWithWrapperIcon>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
