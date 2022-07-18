import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { requestTags } from '~/apiServices/tagsServices';
import BarChart from '~/components/BarChart';
import Doughnut from '~/components/Doughnut';
import HeaderWrapper from '~/components/HeaderWrapper';
import { useStore } from '~/store';
import tachmang from './tachmang';

function Report() {
  const [checkDateRange, setCheckDateRange] = useState('none');

  const DivStyledWithDateRange = styled.div`
    display: ${checkDateRange};
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  `;

  const IconStyled = styled(FontAwesomeIcon)`
    cursor: pointer;

    position: absolute;
    top: 5%;
    right: 5%;
  `;

  const DivStyled = styled.div`
    position: relative;
    padding: 20px;
    background-color: #f4f4f4;
  `;

  const [stateTasksPromise, dispatch] = useStore();
  const selectRef = useRef();
  const [tasks, setTask] = useState([]);
  const tasksRef = useRef([]);
  const [tasksAll, setTaskAll] = useState([]);
  const [tags, setTags] = useState([]);
  const TimeRef = useRef([]);
  const timeTag = useRef(0);
  const filterStartTime = useRef();
  const filterEndTime = useRef();

  const TextRef = useRef();

  const fetchApi = async () => {
    const resultTasks = await stateTasksPromise.data;
    const resultTags = await requestTags();
    console.log('gọi Api');
    tasksRef.current = resultTasks;
    setTags(resultTags);
    setTaskAll(resultTasks);
    setTask(resultTasks);
  };
  useEffect(() => {
    // effect
    TextRef.current.innerText = 'This All';

    fetchApi();

    return () => {
      // cleanup
    };
  }, [stateTasksPromise]);
  const dataTime = () => {
    TimeRef.current = [];

    for (let tag of tags) {
      timeTag.current = 0;
      if (tasks.length > 0) {
        for (let task of tasks) {
          if (task.tags.includes(tag.id)) {
            const arrTime = task.time_spent.split(' ');
            const arrsaukhitach = tachmang(arrTime, 2);
            const obj = {};

            for (const arr of arrsaukhitach) {
              obj[arr[1]] = arr[0];
            }
            let hour = obj.hour ? obj.hour * 3600 : 0;
            let minute = obj.mins ? obj.mins * 60 : 0;
            let second = obj.seconds ? obj.seconds : 0;

            let time = Number(hour) + Number(minute) + Number(second);
            timeTag.current += time;
          }
        }
      }

      TimeRef.current.push(timeTag.current / 3600);
      timeTag.current = 0;
    }

    return TimeRef.current;
  };
  function totalTime() {
    return dataTime()
      .reduce((total, cur) => {
        return total + cur;
      }, 0)
      .toFixed(2);
  }

  function handleFilter(e) {
    console.log('Filter:', e.target.value);
    setTaskAll(tasksRef.current);

    switch (e.target.value) {
      case 'today':
        TextRef.current.innerText = 'Today';
        setTimeout(() => {
          setTask(tasksAll.filter(task => moment(task.start_time).format('l') === moment().format('l')));
        }, 0);

        break;
      case 'yesterday':
        TextRef.current.innerText = 'Yesterday';

        setTask(tasksAll.filter(task => moment(task.start_time).format('l') === moment().subtract(1, 'days').format('l')));

        break;

      case 'thisweek':
        TextRef.current.innerText = 'This Week';

        setTask(
          tasksAll.filter(
            task =>
              moment().startOf('week').format('l') <= moment(task.start_time).format('l') &&
              moment(task.start_time).format('l') <= moment().endOf('week').format('l')
          )
        );

        break;
      case 'lastweek':
        TextRef.current.innerText = 'Last Week';

        setTask(
          tasksAll.filter(
            task =>
              moment().subtract(7, 'days').startOf('week').format('l') <= moment(task.start_time).format('l') &&
              moment(task.start_time).format('l') <= moment().subtract(7, 'days').endOf('week').format('l')
          )
        );
        break;
      case 'thismonth':
        TextRef.current.innerText = 'This Month';

        setTask(
          tasksAll.filter(
            task =>
              moment().startOf('month').format('l') <= moment(task.start_time).format('l') &&
              moment(task.start_time).format('l') <= moment().endOf('month').format('l')
          )
        );
        break;
      case 'lastmonth':
        TextRef.current.innerText = 'Last Month';

        setTask(
          tasksAll.filter(
            task =>
              moment().subtract(1, 'months').startOf('month').format('l') <= moment(task.start_time).format('l') &&
              moment(task.start_time).format('l') <= moment().subtract(1, 'months').endOf('month').format('l')
          )
        );
        break;
      case 'range':
        setCheckDateRange('flex');
        break;
      default:
        TextRef.current.innerText = 'This All';

        setTask(tasksAll);
        break;
    }
  }

  function handleClose() {
    selectRef.current.value = '...';
    setCheckDateRange('none');
    filterStartTime.current = undefined;
    filterEndTime.current = undefined;
  }
  function handleFilterStartTime(e) {
    filterStartTime.current = e.target.value;
  }
  function handleFilterEndTime(e) {
    filterEndTime.current = e.target.value;
  }
  function handleFilterRange() {
    TextRef.current.innerText = 'Range';

    if (filterStartTime.current && filterEndTime.current) {
      setTask(
        tasksAll.filter(
          task =>
            moment(filterStartTime.current).format('l') <= moment(task.start_time).format('l') &&
            moment(task.start_time).format('l') <= moment(filterEndTime.current).format('l')
        )
      );
    } else {
      if (filterStartTime.current) {
        setTask(tasksAll.filter(task => moment(filterStartTime.current).format('l') <= moment(task.start_time).format('l')));
      }
      if (filterEndTime.current) {
        setTask(tasksAll.filter(task => moment(task.start_time).format('l') <= moment(filterEndTime.current).format('l')));
      }
    }
    selectRef.current.value = '...';
    setCheckDateRange('none');
    filterStartTime.current = undefined;
    filterEndTime.current = undefined;
  }
  return (
    <div>
      <HeaderWrapper>
        <h3>Productivity report</h3>
      </HeaderWrapper>
      <div>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <h3>
              <span ref={TextRef}>This all</span>: <span>{totalTime()} hours</span>
            </h3>
            <select ref={selectRef} onChange={handleFilter}>
              <option value="...">---</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="thisweek">This week</option>
              <option value="lastweek">Last week</option>
              <option value="thismonth">this month</option>
              <option value="lastmonth">Last month</option>
              <option value="range">Date range</option>
            </select>
          </div>
          <Row>
            <Col lg={4}>
              <Doughnut dataTime={dataTime} />
            </Col>
            <Col lg={8}>
              <BarChart dataTime={dataTime} />
            </Col>
          </Row>
        </div>
      </div>
      <DivStyledWithDateRange>
        <DivStyled className="d-flex flex-column align-items-center">
          <IconStyled icon={faTimes} onClick={handleClose} />

          <div className="d-flex align-items-center">
            <div className="px-2">
              <p>Start Date</p>
              <input type="Date" onChange={handleFilterStartTime} />
            </div>
            <div className="px-2">
              <p>End Date</p>
              <input type="Date" onChange={handleFilterEndTime} />
            </div>
          </div>
          <Button onClick={handleFilterRange}>OK</Button>
        </DivStyled>
      </DivStyledWithDateRange>
    </div>
  );
}

export default Report;
