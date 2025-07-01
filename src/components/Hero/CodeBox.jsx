import React from 'react';

const CodeBox = () => {
  return (
    <div className="code-box" role="img" aria-label="Code snippet showing developer class">
      <div className="code-header">
        <div className="code-dots">
          <div className="dot red" aria-hidden="true"></div>
          <div className="dot yellow" aria-hidden="true"></div>
          <div className="dot green" aria-hidden="true"></div>
        </div>
        <span className="file-name">portfolio.js</span>
      </div>
      <div className="code-content">
        <div className="code-line">
          <span className="code-keyword">class</span>{' '}
          <span className="code-function">Developer</span> {'{'}
        </div>
        <div className="code-line">
          &nbsp;&nbsp;<span className="code-function">constructor</span>() {'{'}
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">this</span>.
          <span className="code-var">name</span> = <span className="code-string">"Nishant Thakur"</span>;
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">this</span>.
          <span className="code-var">role</span> = <span className="code-string">"Software Developer"</span>;
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">this</span>.
          <span className="code-var">skills</span> = [
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"Flutter"</span>, 
          <span className="code-string">"React"</span>, <span className="code-string">"Python"</span>,
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"AWS"</span>, 
          <span className="code-string">"Docker"</span>, <span className="code-string">"GCP"</span>,
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">"System Design"</span>
        </div>
        <div className="code-line">&nbsp;&nbsp;&nbsp;&nbsp;];</div>
        <div className="code-line">&nbsp;&nbsp;{'}'}</div>
        <div className="code-line"></div>
        <div className="code-line">
          &nbsp;&nbsp;<span className="code-function">buildProject</span>(<span className="code-var">idea</span>) {'{'}
        </div>
        <div className="code-line">
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span>{' '}
          <span className="code-string">`Transforming ${'${idea}'} into reality`</span>;
        </div>
        <div className="code-line">&nbsp;&nbsp;{'}'}</div>
        <div className="code-line">{'}'}</div>
      </div>
    </div>
  );
};

export default CodeBox;