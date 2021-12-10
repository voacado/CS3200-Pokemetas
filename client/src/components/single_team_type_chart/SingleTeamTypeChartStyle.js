import styled from 'styled-components';

export const Table = styled.table`
  text-align: left;
  overflow: hidden;
  width: 63%;
  margin: 0 auto;
  margin-right: -20px;
  display: table;
  padding: 0 0em 1.5em 0;

  position: absolute;
  left: 32vw;
  top: 4.1vh;

  &th h1 {
    font-weight: bold;
    font-size: 1em;
    text-align: left;
    color: #185875;
  }

  &td {
    font-weight: normal;
    font-size: 1em;
    -webkit-box-shadow: 0 2px 2px -2px #0E1119;
    -moz-box-shadow: 0 2px 2px -2px #0E1119;
    box-shadow: 0 2px 2px -2px #0E1119;
  }

  &td th {
    padding-bottom: 0.5%;
    padding-top: 0.5%;
    padding-left: 2%; 
  }

  /* Background-color of the odd rows */
  &tr:nth-child(odd) {
    background-color: #323C50;
  }

  /* Background-color of the even rows */
  &tr:nth-child(even) {
    background-color: #2C3446;
  }

  &th {
    background-color: #1F2739;
  }

  &td:first-child { color: #FB667A; }

  &tr:hover {
    background-color: #464A52;
  -webkit-box-shadow: 0 6px 6px -6px #0E1119;
      -moz-box-shadow: 0 6px 6px -6px #0E1119;
            box-shadow: 0 6px 6px -6px #0E1119;
  }

  &td:hover {
    background-color: #FFF842;
    color: #403E10;
    font-weight: bold;
    
    box-shadow: #7F7C21 -1px 1px, #7F7C21 -2px 2px, #7F7C21 -3px 3px, #7F7C21 -4px 4px, #7F7C21 -5px 5px, #7F7C21 -6px 6px;
    transform: translate3d(6px, -6px, 0);
    
    transition-delay: 0s;
      transition-duration: 0.4s;
      transition-property: all;
    transition-timing-function: line;
  }

  @media (max-width: 800px) {
    .container td:nth-child(4),
    .container th:nth-child(4) { display: none; }
    }
`