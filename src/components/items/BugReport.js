import React from "react";
import Sentence from "./Sentence";
import { Link } from "react-router-dom";
import "./BugReport.css";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";

export default function BugReport({ bugReport, filter }) {
  var sentence1 = bugReport[0];
  var sentence2 = bugReport[1];
  const searchTerm = useSelector((state) => state.bugReport.searchTerm);
  const highlightWords = searchTerm.split(" ");
  const limit = 80;
  const displayedSentence =
    bugReport[0].title.slice(0, limit) +
    (bugReport[0].title.length > limit ? "..." : "");
  switch (filter) {
    case "problem":
      const tempList1 = bugReport.filter((item) => item.result_label === 1);
      if (bugReport.count > 1) {
        sentence1 = tempList1[0];
        sentence2 = tempList1[1];
      } else {
        sentence1 = tempList1[0];
        if (bugReport[0] === sentence1) sentence2 = bugReport[1];
        else sentence2 = bugReport[0];
      }
      break;

    case "solution":
      const tempList2 = bugReport.filter((item) => item.result_label === 2);
      if (bugReport.count > 1) {
        sentence1 = tempList2[0];
        sentence2 = tempList2[1];
      } else {
        sentence1 = tempList2[0];
        if (bugReport[0] === sentence1) sentence2 = bugReport[1];
        else sentence2 = bugReport[0];
      }
      break;
    case "other":
      const tempList3 = bugReport.filter((item) => item.result_label === 3);
      if (bugReport.count > 1) {
        sentence1 = tempList3[0];
        sentence2 = tempList3[1];
      } else {
        sentence1 = tempList3[0];
        if (bugReport[0] === sentence1) sentence2 = bugReport[1];
        else sentence2 = bugReport[0];
      }
      break;
    default:
      break;
  }
  return (
    <div className="bug_item_container">
      <Link className="link_bug" to={`/bug-report/${bugReport[0].id_bug}`}>
        {/* <h2 className="item_title">{bugReport[0].title}</h2> */}
        <Highlighter
          className="item_title"
          highlightClassName={"title_highlight"}
          searchWords={highlightWords}
          autoEscape={true}
          textToHighlight={displayedSentence}
        />
        <div className="item_content">
          {sentence1 && <Sentence sentence={sentence1}/>}
          {sentence2 && <Sentence sentence={sentence2} isPlus={ true}/>}
        </div>
        <div className="ReadMore">Read more</div>
      </Link>
    </div>
  );
}
