import React from "react";
import { useSelector } from "react-redux";
import "./Sentence.css";
import Highlighter from "react-highlight-words";

export default function Sentence(props) {
  const { sentence, isPlus} = props;
  const searchTerm = useSelector((state) => state.bugReport.searchTerm);
  const highlightWords = searchTerm.split(" ");
  const tab = useSelector(state => state.bugReport.filter);
  // console.log('tab', tab);
  const limit = tab === "all" ? 100 : 85;
  const label = sentence.result_label === 1 ? "problem" : sentence.result_label === 2 ? "solution" : sentence.result_label === 3 ? "other" : "all";
  const displayedSentence = isPlus
    ? sentence.content_sentence.slice(0, limit) + " ..."
    : sentence.content_sentence.slice(0, limit) +
      (sentence.content_sentence.length > limit ? " ..." : "");
  return (
    <div className={`sentence_container ${tab===null?"":tab === "all" || label !== tab ? "no_label" : ""}`}>
      <div
        className={ 
          sentence.result_label === 1
            ? "label label_problem"
            : sentence.result_label === 2
            ? "label label_solution"
            : "label label_other"
        }
      >
        {sentence.result_label === 1
          ? "Problem"
          : sentence.result_label === 2
          ? "Solution"
          : "Other"}
      </div>
      <div
        className={
          sentence.result_label === 1
            ? "sentence sentence_problem"
            : sentence.result_label === 2
            ? "sentence sentence_solution"
            : "sentence sentence_other"
        }
      >
        <Highlighter
          highlightClassName={
            tab === "all"
              ? "highlight"
              : sentence.result_label === 1
              ? "highlight highlight_problem"
              : sentence.result_label === 2
              ? "highlight highlight_solution"
              : "highlight highlight_other"
          }
          searchWords={highlightWords}
          autoEscape={true}
          textToHighlight={displayedSentence}
        />
        {/* {sentence.content_sentence} */}
      </div>
    </div>
  );
}
