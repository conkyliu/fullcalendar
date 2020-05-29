/**
 * @Description:
 * @author Conky Liu
 * @date 2020/5/29 10:06 上午
 */

import React, {Component} from 'react';
import {Radio} from 'antd'
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

interface IProps {

}

class index extends Component<IProps> {
  state = {
    view: 'time',
    weekView: 'dayGridWeek'
  }
  calendarComponentRef = React.createRef();

  componentDidMount() {
  }

  render() {
    let header =
      this.state.view === 'time'
        ? {
          start: '', // 'prev,next today',
          center: `timeGridDay,${this.state.weekView},dayGridMonth prev title next today`,
          end: '',
        }
        : {
          start: '', // 'prev,next today',
          center: 'prev title next today',
          end: '',
        };

    const slotDuration = () => {
      if (this.state.weekView === 'dayGridWeek') {
        return {hour: 0.5};
      }
      return {day: 1};
    };

    return (
      <div>
        <div>
          View: <Radio.Group
          options={[{label: 'time', value: 'time'}, {label: 'resource', value: 'resource'}]}
          defaultValue={this.state.view}
          onChange={(e) => {
            let obj = {
              time: 'dayGridWeek',
              resource: 'resourceTimelineWeek'
            }
            if (this.calendarComponentRef.current) {
              this.calendarComponentRef.current.getApi().changeView(obj[e.target.value])
            }
            this.setState({view: e.target.value})

          }}
        />
        </div>
        <div>
          weekView: <Radio.Group
          options={[{label: 'dayGridWeek', value: 'dayGridWeek'}, {
            label: 'resourceTimelineWeek',
            value: 'resourceTimelineWeek'
          }]}
          defaultValue={this.state.weekView}
          onChange={(e) => {
            if (this.calendarComponentRef.current) {
              this.calendarComponentRef.current.getApi().changeView(e.target.value)
            }
            this.setState({weekView: e.target.value})
          }}
          disabled={this.state.view === 'resource'}
        />
        </div>

        <div>
          <FullCalendar
            initialView={'dayGridWeek'}
            headerToolbar={header}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              resourceTimelinePlugin,
              interactionPlugin,
            ]}
            ref={this.calendarComponentRef}
            slotDuration={slotDuration()}


          />
        </div>
      </div>
    );
  }

}


export default index
