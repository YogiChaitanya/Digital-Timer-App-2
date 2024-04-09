// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onIncrementMinBtn = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecrementMinBtn = () => {
    const {timerLimitInMinutes, isTimerRunning} = this.state
    if (timerLimitInMinutes > 1 && isTimerRunning === false) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  increamentTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    // 30. mentioned limit is completed means we have stop the timer
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      // 31. if the timer is completed means it has to goes to original state
      this.clearTimerInterval()

      // 32. timer will stop
      this.setState({
        isTimerRunning: false,
      })
    } else {
      // 33. timer is running means what we have to do
      // 34. every 1000 milliseconds `${timeElapsedInSeconds}` value has to increase
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    // 4. destructuring the isTimerRunning, timerElapsedInSeconds & timerLimitInMinutes from state
    const {
      timerLimitInMinutes,
      timeElapsedInSeconds,
      isTimerRunning,
    } = this.state

    // 5. check weather the timer is completed or not and the result will be assigned to the isTimerCompleted.
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      // if the timer is completed (isTimerCompleted is true)
      // 6.1 set the state variable timeElapsedInSeconds is zero.
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      // 7. if the timer is running(isTimerRunning is true)
      // 7.1 clear the timer interval
      this.clearTimerInterval()
    } else {
      // 8. if the timer is not running (isTimerRunning is false)
      // 8.1 set the interval
      this.intervalId = setInterval(this.increamentTimeElapsedInSeconds, 1000)
    }

    // 9. toggling the state isTimerRunning based on the previous state
    this.setState(prevState => ({
      // mistake5 i wrote isTimmerRunning instead of isTimerRunning
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onclickResetBtn = () => {
    // 20. if click reset button what will hapen
    // 21. timer will be zero
    this.clearTimerInterval(this.intervalId)

    // 22. it will go to initial stage
    this.setState(initialState)
  }

  renderTimerController = () => {
    // 1. Destructuring the isTimerRunning from the state object
    // mistake5 i wrote isTimmerRunning instead of isTimerRunning
    const {isTimerRunning} = this.state

    // 2. based on the state variable startOrPauseImageUrl either any one of the image src will be assigned to startOrPauseImageUrl
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    // 3. based on the state variable startOrPauseImageUrl either pause icon play icon text will be assigned to the startOrPauseAltText
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            src={startOrPauseImageUrl}
            className="timer-controller-icon"
            alt={startOrPauseAltText}
          />

          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>

        <button
          onClick={this.onclickResetBtn}
          className="timer-controller-btn"
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="timer-controller-icon"
            alt="reset icon"
          />
          <p className="timer-controller-label"> Reset</p>
        </button>
      </div>
    )
  }

  renderMinutesController = () => {
    const {timerLimitInMinutes} = this.state

    return (
      <div className="minutes-controller">
        <p className="paragraph1">Set Timer limit</p>

        <div className="minutes-card">
          <button
            onClick={this.onDecrementMinBtn}
            className="plus-minus-btn"
            type="button"
          >
            -
          </button>
          <div className="set-timer">
            <p className="timer-level">{timerLimitInMinutes}</p>
          </div>
          <button
            onClick={this.onIncrementMinBtn}
            className="plus-minus-btn"
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getElaspedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    // if the value of the minutes is less than 9(single digit)
    // (or) then the 0 will be attched in front of it to from a double-digit
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`

    // if the value of the seconds is less than 9(single digit)
    // (or) then the 0 will be attached in font
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    // mistake5 i wrote isTimmerRunning instead of isTimerRunning
    const {isTimerRunning} = this.state

    const labelTest = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="card-container">
          <div className="timer-container">
            <div className="timer-card">
              <h1 className="timer">{this.getElaspedSecondsInTimeFormat()}</h1>
              <p className="timer-controller-lablel">{labelTest}</p>
            </div>
          </div>

          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderMinutesController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
