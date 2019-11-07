import React, { useState, useEffect } from 'react';
import { container, ACTIONS } from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown.js';
import 'popper.js/dist/popper.js';
import 'jquery/dist/jquery.js';
import 'bootstrap-select/dist/css/bootstrap-select.css';
import 'bootstrap-select/dist/js/bootstrap-select.js';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { TiSocialFacebook, TiSocialTwitter, TiSocialLinkedin } from "react-icons/ti";
import { IoMdMail } from "react-icons/io";
import { IconContext } from "react-icons";
import './App.css';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1>Calendar of Events and Activities</h1>
            <p>
              Upcoming opportunities and continued learnig, social engagement, and pro bono projects. Use the filters to search or narrow events and activities.
            </p>
          </div>
          <div className="col-md-4">
            <img src="imgs/events.png" alt="logo" className="logo"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

const Filter = () => {
  const optionsDate = [
    { value: "(Any)" },
    { value: "Today" },
    { value: "Tommorow" },
    { value: "This Week" },
    { value: "This Weekend" },
    { value: "This Month" },
    { value: "Next Month" }
  ];
  const optionsAud = [
    { value: "(Any)" },
    { value: "Alumni Only" },
    { value: "Angles Members Only" },
    { value: "General Public" },
    { value: "Members Only" }
  ];
  const optionsCat = [
    { value: "(Any)" },
    { value: "Alumni Angels" },
    { value: "Alumni Startups" },
    { value: "Arts & Culture" },
    { value: "Career & Leadership" },
    { value: "Community Partners" },
    { value: "Consumer/Fashion" },
    { value: "Entrepreneurs" },
    { value: "Finance" },
    { value: "HBS Professors" },
    { value: "Leadership Dinner" },
    { value: "Media & Tech" },
    { value: "Other" },
    { value: "Seniors" },
    { value: "Skills Gap" },
    { value: "Social Enterprise Prog." },
    { value: "Wine & Dine" },
    { value: "Young Alum/Social" }
  ];
  const [selectedOptionDate, setSelectedOptionDate] = useState(optionsDate[0].value);
  const [selectedOptionAud, setSelectedOptionAud] = useState(optionsAud[0].value);
  const [selectedOptionCat, setSelectedOptionCat] = useState(optionsCat[0].value);
  const changeDate = (e) => {
    setSelectedOptionDate(e.target.value);    
  }
  const changeAud = (e) => {
    setSelectedOptionAud(e.target.value);
  }
  const changeCat = (e) => {
    setSelectedOptionCat(e.target.value);
  }

  useEffect(() => {
    container.dispatch(ACTIONS.FILTER, {
      date: selectedOptionDate,
      aud: selectedOptionAud,
      cat: selectedOptionCat
    });
  }, [selectedOptionDate, selectedOptionAud, selectedOptionCat]);

  return (
    <div className="filter">
      <form>
        <div className="row">
          <div className="col-md-4">
            <h6>SEARCH</h6>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter Search Terms" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                  <IconContext.Provider value={{ color: "white", className: "searchIcon" }}>
                    <FaSearch />
                  </IconContext.Provider>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <h6>DATE RANGE</h6>
            <select className="form-control selectpicker" value={selectedOptionDate} onChange={changeDate}>
              {optionsDate.map(o => (
                <option value={o.value} key={o.value}>{o.value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <h6>AUDIENCE</h6>
            <select className="form-control selectpicker" value={selectedOptionAud} onChange={changeAud}>
              {optionsAud.map(o => (
                <option value={o.value} key={o.value}>{o.value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <h6>CATEGORY</h6>
            <select className="form-control selectpicker" value={selectedOptionCat} onChange={changeCat}>
              {optionsCat.map(o => (
                <option value={o.value} key={o.value}>{o.value}</option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

const Event = (props) => {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [showLoc, setShowLoc] = useState(false);
  useEffect(() => {
    let tempDate = new Date(props.event.date);
    let day = tempDate.getDate();
    if (day < 10) {
      day = "0" + day
    }
    let month = tempDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    let year = tempDate.getFullYear();
    setDay(day);
    setMonth(month);
    setYear(year);
    if (props.event.location !== null){
      setShowLoc(true)
    }
  }, [props.event.date, props.event.location])

  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <div className="date">
            <div className="month">{month}</div>
            <div className="day">{day}</div>
            <div className="year">{year}</div>
          </div>
          <div>
            <p className="title">{props.event.title}</p>
            <p className="grey">{props.event.daytime}<br />{showLoc ? <span><FaMapMarkerAlt /> {props.event.location}</span> : null}</p>
            <p ><span className="audience">{props.event.audience}</span><span className="categories">{props.event.categories}</span></p>
          </div>
        </div>
        <div className="card-footer">
          <IconContext.Provider value={{ color: "#cccccc", className: "soc" }}>
            <TiSocialFacebook />
            <TiSocialTwitter />
            <TiSocialLinkedin />
            <IoMdMail />
          </IconContext.Provider>
          <p><a href="/register" className="reg">Register</a></p>
        </div>
      </div>
    </div>
  );
}

const Events = () => {
  const [events, setEvents] = useState([]);
  const [requestedData, setRequestedData] = useState();
  const [chosenEvents, setchosenEvents] = useState([]);
  if (events.length === 0) {
    fetch(`db/db.json`)
      .then(res => res.json())
      .then(eventsData => {
        setEvents(eventsData);
      });
  }
  container.subscribe(() => {
    const _requestedData = container.getState().requestedData;
    setRequestedData(_requestedData);
  });

  useEffect(() => {
    let tempCat = [], tempAud = [], tempDate = [];  
    //filter cat
    events.forEach(event => {
      if ( event.categories === requestedData[0].cat.toUpperCase()) {
        tempCat.push(event);
      } else if (requestedData[0].cat === "(Any)") {
        tempCat.push(event);
      }
    });
    //filter aud
    tempCat.forEach(event => {
      if (event.audience === requestedData[0].aud.toUpperCase()) {
        tempAud.push(event);
      } else if (requestedData[0].aud === "(Any)") {
        tempAud.push(event);
      }
    });
    tempAud.forEach(event => {
      //today
      let today = new Date();
      //tomorrow
      let tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      //this week
      let week = [];
      let current = new Date();
      let first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
      let last = first + 7; // last day is the first day + 6
      let lastday = new Date(current.setDate(last));
      function parseDate(str) {
        var mdy = str.toString().split(' ');
        let month = new Date(Date.parse(mdy[1] + " 1, 2012")).getMonth();
        return new Date(mdy[3], month, mdy[2]);
      }
      function datediff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
      }
      let thisWeekDays = datediff(parseDate(today), parseDate(lastday));
      for (let i = 0; i <= thisWeekDays; i++) {
        let current2 = new Date();
        let tempDay = current2.setDate(current2.getDate() + i)
        tempDay = new Date(tempDay);
        week.push(tempDay)
      }
      //this weekend
      const weekend = week.slice(Math.max(week.length - 2, 1));
      //this month
      let month = [];
      let current3 = new Date();
      const lastDate = new Date(current3.getFullYear(), current3.getMonth() + 1, 0);
      function parseDate2(str) {
        var mdy = str.toString().split(' ');
        let month = new Date(Date.parse(mdy[1] + " 1, 2012")).getMonth();
        return new Date(mdy[3], month, mdy[2]);
      }
      function datediff2(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
      }
      let thisMonthDays = datediff2(parseDate2(today), parseDate2(lastDate));
      for (let i = 0; i <= thisMonthDays; i++) {
        let current4 = new Date();
        let tempDay = current4.setDate(current4.getDate() + i)
        tempDay = new Date(tempDay);
        month.push(tempDay)
      }
      //next month
      let nextMonth = [];
      let current5 = new Date();
      let firstNextMonth = new Date(current5.getFullYear(), current5.getMonth() + 1, 1);
      let lastNextMonth = new Date(current5.getFullYear(), current5.getMonth() + 2, 0);
      function parseDate3(str) {
        var mdy = str.toString().split(' ');
        let month = new Date(Date.parse(mdy[1] + " 1, 2012")).getMonth();
        return new Date(mdy[3], month, mdy[2]);
      }
      function datediff3(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
      }
      let nextMonthDays = datediff3(parseDate3(firstNextMonth), parseDate3(lastNextMonth));
      let tempDay = new Date(current5.getFullYear(), current5.getMonth() + 1, 1);
      for (let i = 0; i <= nextMonthDays; i++) {
        nextMonth.push(tempDay);
        tempDay = firstNextMonth.setDate(firstNextMonth.getDate() + 1)
        tempDay = new Date(tempDay);
      }
      //filter date
      if (requestedData[0].date === "Today") {
        if (new Date(event.date).getDate() === today.getDate() && new Date(event.date).getMonth() === today.getMonth() && new Date(event.date).getFullYear() === today.getFullYear()) {
          tempDate.push(event);
        }
      } else if (requestedData[0].date === "Tommorow") {
        if (new Date(event.date).getDate() === tomorrow.getDate() && new Date(event.date).getMonth() === tomorrow.getMonth() && new Date(event.date).getFullYear() === tomorrow.getFullYear()) {
          tempDate.push(event);
        }
      } else if (requestedData[0].date === "This Week") {
        week.map(day => {
          if (new Date(event.date).getDate() === day.getDate() && new Date(event.date).getMonth() === day.getMonth() && new Date(event.date).getFullYear() === day.getFullYear()) {
            tempDate.push(event)
          }
          return tempDate;
        });
      } else if (requestedData[0].date === "This Weekend") {
        weekend.map(day => {
          if (new Date(event.date).getDate() === day.getDate() && new Date(event.date).getMonth() === day.getMonth() && new Date(event.date).getFullYear() === day.getFullYear()) {
            tempDate.push(event)
          }
          return tempDate;
        });
      } else if (requestedData[0].date === "This Month") {
        month.map(day => {
          if (new Date(event.date).getDate() === day.getDate() && new Date(event.date).getMonth() === day.getMonth() && new Date(event.date).getFullYear() === day.getFullYear()) {
            tempDate.push(event)
          }
          return tempDate;
        });
      } else if (requestedData[0].date === "Next Month") {
        nextMonth.map(day => {
          if (new Date(event.date).getDate() === day.getDate() && new Date(event.date).getMonth() === day.getMonth() && new Date(event.date).getFullYear() === day.getFullYear()) {
            tempDate.push(event)
          }
          return tempDate;
        });
      } else if (requestedData[0].date === "(Any)") {
        tempDate.push(event);
      }
    });
    setchosenEvents(tempDate);
  }, [events, requestedData]);

  return (
    <div className="row">
      {chosenEvents.map((event, i) => (
        <Event {...event} key={i} event={event} />
      ))}
    </div>
  );
}

const Month = () => {
  return (
    <div>
      <h4 className="monthBig">November</h4>
      <Events />
    </div>
  );
}

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="col-md-12">
          <Filter />
          <Month />
        </div>
      </div>
    </div>
  );
}

export default App;
