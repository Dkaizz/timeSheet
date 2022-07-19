import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { requestTags } from '~/apiServices/tagsServices';
import { editDataInput, removeDataInput, setDataInput, useStore } from '~/store';

import { useValueContext } from '~/hooks';
import Header from '~/pages/Home/Header';
import {
  ButtonStyledBtnTask,
  DivSTyledMenuBody,
  DivStyledMenuWrapper,
  DivStyledNotification,
  DivStyledTask,
  DivStyledTaskItem,
  DivStyledWrapper,
  DivStyledwrapperItem,
  DivStyledwrapperTask,
  PStyledTime,
} from './HomeStyled';
import styled from 'styled-components';

const DivStyledWrapperConten = styled.div`
  padding-top: 10px;
`;

const DivStyledTitle = styled.div`
  h6 {
    display: inline-block;
    margin-right: 20px;
  }
  input {
    background-color: transparent;
  }
`;

function Home() {
  const contextVale = useValueContext();

  const [stateTasksPromise, dispatch] = useStore();
  const { checkStart, setCheckStart } = contextVale.checkRun;
  const TimePut = contextVale.timePut;

  const [tasks, setTask] = useState();
  const [tags, setTags] = useState();
  const checkRef = useRef();
  const notification = useRef();

  const [limit, setLimit] = useState(5);

  const [infoFilter, setInfoFilter] = useState();
  const [notifiDeleteTask, setNotifiDeleteTask] = useState('none');

  const itemTaskDelete = useRef();

  useEffect(() => {
    // effect
    const fetchApi = async () => {
      const resultTasks = await stateTasksPromise.data;
      const sortTask = resultTasks.sort(function (a, b) {
        return new Date(b.start_time) - new Date(a.start_time);
      });
      const TaskEnd = [];
      //tách mảng
      for (let item of sortTask) {
        if (TaskEnd.length === 0) {
          TaskEnd.push([item]);
        } else {
          if (TaskEnd.length > 0) {
            for (const arrTask of TaskEnd) {
              for (const task of arrTask) {
                if (task.id !== item.id) {
                  if (moment(task.start_time).format('l') === moment(item.start_time).format('l')) {
                    console.log('thêm mảng');
                    arrTask.push(item);
                    checkRef.current = false;
                    break;
                  } else {
                    checkRef.current = true;
                  }
                }
              }
            }
          }
          if (checkRef.current) {
            TaskEnd.push([item]);
          }
        }
      }

      const resultTags = await requestTags();
      setTags(resultTags);

      console.log('mảng mới: ', TaskEnd);

      setTask(TaskEnd);
    };
    fetchApi();

    return () => {
      // cleanup
    };
  }, [stateTasksPromise]);

  function handleStart(item) {
    setCheckStart(true);
    dispatch(
      editDataInput(
        {
          ...item,
          status: 0,
        },
        item.id
      )
    );

    dispatch(setDataInput());
  }

  function handleStop(item) {
    setCheckStart(false);
    dispatch(
      editDataInput(
        {
          ...item,
          end_time: moment().format('YYYY-MM-DD h:mm:ss'),
          time_spent: TimePut.current,
          status: 1,
        },
        item.id
      )
    );
    dispatch(setDataInput());
  }

  function handRemove(item) {
    dispatch(removeDataInput(item.id));
    dispatch(setDataInput());
    setNotifiDeleteTask('none');
  }

  function handleNotifi(item) {
    setNotifiDeleteTask('block');
    itemTaskDelete.current = item;
  }
  function handleClose() {
    setNotifiDeleteTask('none');
  }

  function handleAddCount() {
    setLimit(pre => pre + 1);
  }

  function handleFilter(e) {
    setInfoFilter(e.target.value);
  }
  function renderTask() {
    if (tasks && tags) {
      if (infoFilter) {
        return tasks
          .filter(itemArr => moment(itemArr[0].start_time).format('l') === moment(infoFilter).format('l'))
          .map((arr, index) => {
            console.log('arr: ', arr);
            return (
              <DivStyledwrapperItem key={index}>
                <PStyledTime>{moment(arr[0].start_time).format('l')}</PStyledTime>
                <DivStyledwrapperTask>
                  {arr.map((item, index2) => {
                    const arrTag = [];
                    for (let tag of tags) {
                      for (let itemTag of item.tags) {
                        if (itemTag === tag.id) {
                          arrTag.push(tag.name);
                        }
                      }
                    }

                    return (
                      <DivStyledTask key={index2}>
                        <p>{item.description}</p>
                        <DivStyledTaskItem>
                          {arrTag.map((tag, id) => {
                            if (id > 0) {
                              return <span key={id}>- {tag} </span>;
                            } else {
                              return <span key={id}> {tag} </span>;
                            }
                          })}
                        </DivStyledTaskItem>
                        <DivStyledTaskItem>
                          <span>{moment(item.start_time).format('LT')}</span>
                          {item.status === 1 && <span> - {moment(item.end_time).format('LT')}</span>}
                        </DivStyledTaskItem>
                        <DivStyledTaskItem>{item.status === 1 ? <span>{item.time_spent}</span> : <span>Running</span>}</DivStyledTaskItem>
                        <DivStyledMenuWrapper>
                          <FontAwesomeIcon icon={faEllipsisV} />
                          <DivSTyledMenuBody>
                            {item.status === 0 ? (
                              <ButtonStyledBtnTask onClick={() => handleStop(item)}>Stop</ButtonStyledBtnTask>
                            ) : checkStart ? (
                              <ButtonStyledBtnTask disabled>Start</ButtonStyledBtnTask>
                            ) : (
                              <ButtonStyledBtnTask onClick={() => handleStart(item)}>Start</ButtonStyledBtnTask>
                            )}
                            <ButtonStyledBtnTask onClick={handleNotifi}>Delete</ButtonStyledBtnTask>
                          </DivSTyledMenuBody>
                        </DivStyledMenuWrapper>
                        <DivStyledNotification ref={notification} display={notifiDeleteTask}>
                          <p>Confirmation</p>
                          <p>Are you sure to delete this item?</p>
                          <div>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={() => handRemove(item)}>Yes</Button>
                          </div>
                        </DivStyledNotification>
                      </DivStyledTask>
                    );
                  })}
                </DivStyledwrapperTask>
              </DivStyledwrapperItem>
            );
          });
      } else {
        return tasks.slice(0, limit).map((arr, index) => {
          return (
            <DivStyledwrapperItem key={index}>
              <PStyledTime>{moment(arr[0].start_time).format('l')}</PStyledTime>
              <DivStyledwrapperTask>
                {arr.map((item, index2) => {
                  const arrTag = [];
                  for (let tag of tags) {
                    for (let itemTag of item.tags) {
                      if (itemTag === tag.id) {
                        arrTag.push(tag.name);
                      }
                    }
                  }

                  return (
                    <DivStyledTask key={index2}>
                      <p>{item.description}</p>
                      <DivStyledTaskItem>
                        {arrTag.map((tag, id) => {
                          if (id > 0) {
                            return <span key={id}>- {tag} </span>;
                          } else {
                            return <span key={id}> {tag} </span>;
                          }
                        })}
                      </DivStyledTaskItem>
                      <DivStyledTaskItem>
                        <span>{moment(item.start_time).format('LT')}</span>
                        {item.status === 1 && <span> - {moment(item.end_time).format('LT')}</span>}
                      </DivStyledTaskItem>
                      <DivStyledTaskItem>{item.status === 1 ? <span>{item.time_spent}</span> : <span>Running</span>}</DivStyledTaskItem>
                      <DivStyledMenuWrapper>
                        <FontAwesomeIcon icon={faEllipsisV} />
                        <DivSTyledMenuBody>
                          {item.status === 0 ? (
                            <ButtonStyledBtnTask onClick={() => handleStop(item)}>Stop</ButtonStyledBtnTask>
                          ) : checkStart ? (
                            <ButtonStyledBtnTask disabled>Start</ButtonStyledBtnTask>
                          ) : (
                            <ButtonStyledBtnTask onClick={() => handleStart(item)}>Start</ButtonStyledBtnTask>
                          )}
                          <ButtonStyledBtnTask onClick={() => handleNotifi(item)}>Delete</ButtonStyledBtnTask>
                        </DivSTyledMenuBody>
                      </DivStyledMenuWrapper>
                      <DivStyledNotification ref={notification} display={notifiDeleteTask}>
                        <h6>Confirmation</h6>
                        <p>Are you sure to delete this item?</p>
                        <div>
                          <button onClick={handleClose}>No</button>
                          <button onClick={() => handRemove(itemTaskDelete.current)}>Yes</button>
                        </div>
                      </DivStyledNotification>
                    </DivStyledTask>
                  );
                })}
              </DivStyledwrapperTask>
            </DivStyledwrapperItem>
          );
        });
      }
    }
  }

  return (
    <DivStyledWrapper>
      <Header />
      <DivStyledWrapperConten>
        <DivStyledTitle>
          <h6>Data filter:</h6>
          <input type="date" onChange={handleFilter} />
        </DivStyledTitle>
        <div>{renderTask()}</div>
        <div>{tasks ? tasks.length > limit ? <Button onClick={handleAddCount}>Load</Button> : undefined : undefined}</div>
      </DivStyledWrapperConten>
    </DivStyledWrapper>
  );
}

export default Home;
