import React from 'react';
import './App.css';
import { questions, results, plays } from './constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_question: 1,
      score: 0,
      state: 'start',
    };
  }

  handle_answer(ans_idx) {
    const ans_score = questions[this.state.current_question][2][ans_idx];
    const score = this.state.score + ans_score;
    this.setState({ score });
    const current_question = this.state.current_question + 1;

    if (current_question > 7)
      this.setState({
        state: 'invitation',
      });
    else
      this.setState({
        current_question,
      });
  }

  render_ans(ans_string, index) {
    return (
      <div className='row' key={index}>
        <div className='ans-btn-group'>
          <button
            type='button'
            className='btn answer-button'
            onClick={() => {
              this.handle_answer(index);
            }}
          >
            {ans_string}
          </button>
        </div>
      </div>
    );
  }

  render_invitation() {
    return (
      <div className='invitation'>
        <div className='container'>
          <div className='card invitation'>
            <div className='card-body'>
              <div className='invitation-title'>
                <p className='card-title invitation-title'>活动名称</p>
              </div>
              <div className='invitation-text'>
                <p className='card-text'>
                  这是聚集脑力风暴的智者们的天堂，xxx（还没想好）
                </p>
              </div>
              <div className='answers'>
                <button
                  type='button'
                  className='btn btn-primary inv-btn'
                  onClick={() => {
                    this.setState({ state: 'finished' });
                  }}
                >
                  查看结果
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render_start() {
    return (
      <div className='container test-start'>
        <h2>测测你是纽约的</h2>
        <h1>哪种食物</h1>
        <button
          type='button'
          className='btn start-btn'
          onClick={() => {
            this.setState({ state: 'testing' });
          }}
        >
          点击开始
        </button>
      </div>
    );
  }

  generate_result() {
    const { score } = this.state;
      if (score >= 29 && score <= 35)
        return results[0];
      else if( score >= 23 && score <= 28)
        return  results[1];
      else if(score >= 17 && score <= 22)
        return results[2];
      else if (score >= 10 && score <= 16)
        return  results[3];
      else
        return results[4];
  }

  send_result() {
    if (
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.sex === '' ||
      this.state.wechat === ''
    ) {
      alert('请正确填写所有信息');
      return;
    }
    if (!this.state.email.endsWith('@nyu.edu')) {
      alert('仅限NYU学生参加，请使用NYU邮箱');
      return;
    }

    let answers_map = {};
    for (let i in this.state.answers) {
      let answer = this.state.answers[i];
      answers_map[answer['question_num']] = answer['ans_num'];
    }
    for (let i in questions) {
      if (!(i in answers_map)) {
        answers_map[i] = -1;
      }
    }

    answers_map['name'] = this.state.name;
    answers_map['email'] = this.state.email;
    answers_map['sex'] = this.state.sex;
    answers_map['wechat'] = this.state.wechat;

    let result = JSON.stringify(answers_map);
    console.log(result);

    var xhr0 = new XMLHttpRequest();
    xhr0.addEventListener('load', () => {
      console.log(xhr0.responseText);
      if (xhr0.responseText.includes('already registered')) {
        alert('您的邮箱已经报名过了!');
      } else {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
          console.log(xhr.responseText);
          alert('报名成功！请等待CSSA工作人员联系~');
        });
        console.log(result);
        xhr.open(
          'GET',
          'https://www.cssanyu.org/2020/questionnaire.php?data=' +
            encodeURIComponent(result),
        );
        // xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send();
      }
    });
    xhr0.open(
      'GET',
      'https://www.cssanyu.org/2020/check_exist.php?data=' +
        encodeURIComponent(result),
    );
    // xhr0.setRequestHeader('Access-Control-Allow-Headers', '*');
    // xhr0.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr0.send();

    this.setState({ state: 'finished' });
  }

  render_finished() {
    const result=this.generate_result();
    const places = result.place.reduce((prev,cur)=>prev=prev + ", "+cur)
    return (
      <div className='container'>
        <div className='container test-result'>
          <h3>与您最符合的食物是：</h3>
          <h1 className='mytitle'>{result.food}</h1>
          <h4>推荐餐厅：</h4>
          <h2 >{places}</h2>
          <div className='desc'>{result.desc}</div>
          <br />
        </div>
        <div className='container roles'>
          <h3>你最适合的角色：</h3>
          {plays.map((name, i) => (
            <div key={i}>
              <h2>{`剧本${i + 1}：${name}`}</h2>
              <h5>{result.roles[i * 2]}</h5>
              <h5>{result.roles[i * 2 + 1]}</h5>
            </div>
          ))} 
        </div>
        <div className='qrcode'>
          <div>
            <p>扫二维码查看剧本简介</p>
          </div>
          <div>
            <p>扫二维码立即报名活动</p>
          </div>
        </div>
      </div>
    );
  }

  render_question() {
    return (
      <div className='container'>
        <div className='card question'>
          <div className='card-body'>
            <h5 className='card-title'>
              {questions[this.state.current_question][0]}
            </h5>
            <div className='answers'>
              {questions[this.state.current_question][1].map(
                this.render_ans.bind(this),
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }


  render() {
    if (this.state.state === 'start') {
      return this.render_start();
    } else if (this.state.state === 'finished') {
      return this.render_finished();
    } else if (this.state.state === 'testing') {
      return this.render_question();
    } else if (this.state.state === 'invitation') {
      return this.render_invitation();
    } 
  }
}

export default App;
