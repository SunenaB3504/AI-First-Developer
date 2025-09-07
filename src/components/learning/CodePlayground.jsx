import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import './CodePlayground.css';

/**
 * CodePlayground component for a real-time code editor and preview.
 * @param {object} props - The component props.
 * @param {object} props.exercise - The exercise data.
 * @returns {JSX.Element} The rendered component.
 */
const CodePlayground = ({ exercise }) => {
  const [html, setHtml] = useState(exercise.html);
  const [css, setCss] = useState(exercise.css);
  const [js, setJs] = useState(exercise.js);
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="code-playground">
      <div className="editor-pane">
        <div className="editor-container">
          <h2>HTML</h2>
          <Editor
            value={html}
            onValueChange={setHtml}
            highlight={(code) => highlight(code, languages.markup)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
        <div className="editor-container">
          <h2>CSS</h2>
          <Editor
            value={css}
            onValueChange={setCss}
            highlight={(code) => highlight(code, languages.css)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
        <div className="editor-container">
          <h2>JavaScript</h2>
          <Editor
            value={js}
            onValueChange={setJs}
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
      </div>
      <div className="preview-pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

CodePlayground.propTypes = {
    exercise: PropTypes.object.isRequired,
};

export default CodePlayground;
