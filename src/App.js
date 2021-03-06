import React from 'react';
import html2canvas from 'html2canvas';
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
        <div className='card-body'>
          <div className='invitation-title'>
            <h3 className='invitation-title-one'>Invitation</h3>
            <h3 className='card-title invitation-title'>
              曼哈顿档案：夜幕降临
            </h3>
            <p className='card-title invitation-subtitle'>
              体验以纽约为背景的剧本杀~
            </p>
          </div>
          <div className='invitation-text'>
            <p className='card-text'>
              &emsp;NYUCSSA诚意推出全新线上剧本杀活动:{' '}
              <b style={{ color: '#fe704b' }}>
                4.23～4.25 【曼哈顿档案：夜幕降临】
              </b>
              。<br />
              <br />
              &emsp;本次活动共有三个剧本，每个剧本由6~7个角色组成。我们将
              <span style={{ color: '#fe704b' }}>根据您本次的测试结果</span>
              ，提供<span style={{ color: '#fe704b' }}>与您匹配的角色</span>
              供您报名活动时进行参考～
              <br />
              <br />
              &emsp;通过本次活动，您将结识更多有趣的小伙伴，并与他们一起斗智斗勇，合作办案。
              <br />
              <br />
              &emsp;本次活动人数有限，赶快抓紧时间报名吧！让我们在这个春天，和同伴们一起探索纽约的真相吧~
            </p>
            <p className='note'>注：报名本次活动请扫描结果页下方的二维码</p>
          </div>
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
    );
  }

  render_start() {
    return (
      <div className='container test-start'>
        <div>
          <h3>测测你是</h3>
          <h2>纽约的哪种食物</h2>
        </div>
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
    if (score >= 29 && score <= 35) return results[0];
    else if (score >= 23 && score <= 28) return results[1];
    else if (score >= 17 && score <= 22) return results[2];
    else if (score >= 10 && score <= 16) return results[3];
    else return results[4];
  }

  generate_image() {
    if (document.getElementById('canvasImg') != null) return;
    const element = document.getElementById('result-container');
    const btns = document.getElementById('btn-class');
    btns.style.visibility = 'hidden';
    html2canvas(element).then(function (canvas) {
      let base64Url = canvas.toDataURL();
      const imgDiv = document.createElement('div');
      imgDiv.className = 'img-container';

      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'close';
      closeBtn.className = 'btn close-btn';
      imgDiv.appendChild(closeBtn);

      const img = document.createElement('img');
      img.id = 'canvasImg';
      img.src = base64Url;
      imgDiv.appendChild(img);

      document.body.appendChild(imgDiv);
      closeBtn.addEventListener('click', () => {
        imgDiv.remove();
        btns.style.visibility = 'visible';
      });
    });
  }

  render_roles() {
    const result = this.generate_result();

    return (
      <div className='result-container' id='result-container'>
        <div className='container roles'>
          <h3>你最适合的角色：</h3>
          <div className='roles-container'>
            {plays.map((name, i) => (
              <div key={i}>
                <h2>{`剧本${i + 1}：${name}`}</h2>
                <h5>{result.roles[i * 2]}</h5>
                <h5>{result.roles[i * 2 + 1]}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className='btn-class' id='btn-class'>
          <button
            onClick={() => this.generate_image()}
            className='btn generate_img'
          >
            生成图片
          </button>
          <button
            onClick={() => this.setState({ state: 'finished' })}
            className='btn role_result'
          >
            查看结果
          </button>
        </div>
        <div className='qrcode'>
          <div>
            <p>扫二码查看活动详情</p>
            <img
              src='https://www.cssanyu.org/2021/jubensha/wx-qrcode.png'
              alt='qrcode'
            ></img>
          </div>
          <div>
            <p>扫二维码立即报名活动</p>
            <img
              src='https://www.cssanyu.org/2021/jubensha/qrcode_register.png'
              alt='qrcode'
            ></img>
          </div>
        </div>
      </div>
    );
  }

  render_finished() {
    const result = this.generate_result();
    return (
      <div className='result-container' id='result-container'>
        <div className='container test-result' id='test-result'>
          <div className='food'>
            <h3>与您最符合的食物是：</h3>
            <h1 className='mytitle'>{result.food}</h1>
          </div>
          <div className='place'>
            <h4>推荐餐厅：</h4>
            <div className='places'>
              {result.place.map((val, i) => (
                <h2 key={i}>{val}</h2>
              ))}
            </div>
          </div>
          <div className='desc'>{result.desc}</div>
        </div>
        <div className='btn-class' id='btn-class'>
          <button
            onClick={() => this.generate_image()}
            className='btn generate_img'
          >
            生成图片
          </button>
          <button
            onClick={() => this.setState({ state: 'roles' })}
            className='btn role_result'
          >
            查看角色
          </button>
        </div>
        <div className='qrcode'>
          <div>
            <p>扫二码查看活动详情</p>
            <img
              src='https://www.cssanyu.org/2021/jubensha/wx-qrcode.png'
              alt='qrcode'
            ></img>
          </div>
          <div>
            <p>扫二维码立即报名活动</p>
            <img
              src='https://www.cssanyu.org/2021/jubensha/qrcode_register.png'
              alt='qrcode'
            ></img>
          </div>
        </div>
      </div>
    );
  }

  render_question() {
    return (
      <div className='question-container'>
        <div className='card-question'>
          <h4>Question {this.state.current_question}</h4>
          <h5 className='card-title'>
            {questions[this.state.current_question][0]}
          </h5>
        </div>
        <div className='answers'>
          {questions[this.state.current_question][1].map(
            this.render_ans.bind(this),
          )}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.state === 'start') {
      return this.render_start();
    } else if (this.state.state === 'finished') {
      return this.render_finished();
    } else if (this.state.state === 'roles') {
      return this.render_roles();
    } else if (this.state.state === 'testing') {
      return this.render_question();
    } else if (this.state.state === 'invitation') {
      return this.render_invitation();
    }
  }
}

export default App;
