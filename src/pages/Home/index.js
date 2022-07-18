import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { requestTags } from '~/apiServices/tagsServices';
import { editDataInput, removeDataInput, setDataInput, useStore } from '~/store';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useValueContext } from '~/hooks';
import Header from '~/pages/Home/Header';
const cx = classNames.bind(styles);
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
  }

  function handleNotifi() {
    notification.current.style.display = 'block';
  }
  function handleClose() {
    notification.current.style.display = 'none';
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
              <div key={index} className={cx('wrapper_item')}>
                <p>{moment(arr[0].start_time).format('l')}</p>
                <div className={cx('wrapper_task')}>
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
                      <div key={index2} className={cx('task')}>
                        <p>{item.description}</p>
                        <div className={cx('task_item')}>
                          {arrTag.map((tag, id) => {
                            return <span key={id}>{tag}</span>;
                          })}
                        </div>
                        <div className={cx('task_item')}>
                          <span>{moment(item.start_time).format('LT')}</span>
                          {item.status === 1 && <span> - {moment(item.end_time).format('LT')}</span>}
                        </div>
                        <div className={cx('task_item')}>{item.status === 1 ? <span>{item.time_spent}</span> : <span>Running</span>}</div>
                        <span className={cx('menu_wrapper')}>
                          <FontAwesomeIcon icon={faEllipsisV} />
                          <div className={cx('menu_body')}>
                            {item.status === 0 ? (
                              <Button className={cx('btn_task')} onClick={() => handleStop(item)}>
                                Stop
                              </Button>
                            ) : checkStart ? (
                              <Button className={cx('btn_task')} disabled>
                                Start
                              </Button>
                            ) : (
                              <Button className={cx('btn_task')} onClick={() => handleStart(item)}>
                                Start
                              </Button>
                            )}
                            <Button className={cx('btn_task')} onClick={handleNotifi}>
                              Delete
                            </Button>
                          </div>
                        </span>
                        <div className={cx('notification')} ref={notification}>
                          <p>Confirmation</p>
                          <p>Are you sure to delete this item?</p>
                          <div>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={() => handRemove(item)}>Yes</Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          });
      } else {
        return tasks.slice(0, limit).map((arr, index) => {
          return (
            <div key={index} className={cx('wrapper_item')}>
              <p>{moment(arr[0].start_time).format('l')}</p>
              <div className={cx('wrapper_task')}>
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
                    <div key={index2} className={cx('task')}>
                      <p>{item.description}</p>
                      <div className={cx('task_item')}>
                        {arrTag.map((tag, id) => {
                          return <span key={id}>{tag}</span>;
                        })}
                      </div>
                      <div className={cx('task_item')}>
                        <span>{moment(item.start_time).format('LT')}</span>
                        {item.status === 1 && <span> - {moment(item.end_time).format('LT')}</span>}
                      </div>
                      <div className={cx('task_item')}>{item.status === 1 ? <span>{item.time_spent}</span> : <span>Running</span>}</div>
                      <span className={cx('menu_wrapper')}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                        <div className={cx('menu_body')}>
                          {item.status === 0 ? (
                            <Button className={cx('btn_task')} onClick={() => handleStop(item)}>
                              Stop
                            </Button>
                          ) : checkStart ? (
                            <Button className={cx('btn_task')} disabled>
                              Start
                            </Button>
                          ) : (
                            <Button className={cx('btn_task')} onClick={() => handleStart(item)}>
                              Start
                            </Button>
                          )}
                          <Button className={cx('btn_task')} onClick={handleNotifi}>
                            Delete
                          </Button>
                        </div>
                      </span>
                      <div className={cx('notification')} ref={notification}>
                        <p>Confirmation</p>
                        <p>Are you sure to delete this item?</p>
                        <div>
                          <Button onClick={handleClose}>No</Button>
                          <Button onClick={() => handRemove(item)}>Yes</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        });
      }
    }
  }

  return (
    <div>
      <Header />

      <div className={cx('header')}>
        <h6>Data filter</h6>
        <input type="date" onChange={handleFilter} />
      </div>
      <div>{renderTask()}</div>
      <div>{tasks ? tasks.length > limit ? <Button onClick={handleAddCount}>Load</Button> : undefined : undefined}</div>
    </div>
  );
}

export default Home;
