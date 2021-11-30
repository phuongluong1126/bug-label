import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../components/items/SearchBar";
import TabSearch from "../components/items/TabSearch";
import "./SearchBug.css";
import { fetchBugReports } from "../api";
import { GetBugReports, SetTab } from "../actions/bugReport";

export default function SearchBug() {
  //functions

  function countInstances(string, word) {
    return string.split(word).length - 1;
  }
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  }
  const dispatch = useDispatch();
  const listItems = useSelector((state) => state.bugReport.listBugReports);
  const searchTerm = useSelector((state) => state.bugReport.searchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [listRender, setListRender] = useState([]);

  //group sentences into bugreport
  useEffect(() => {
    dispatch(SetTab("all"));
    fetchBugReports().then((data) => {
      let tempList = [];
      let count = 1;
      let sumSentence = 0;
      do {
        let tempReport = data.filter((item) => item.id_bug === count);
        tempList.push(tempReport);
        sumSentence = sumSentence + tempReport.length;
        count++;
      } while (sumSentence < data.length);
      const action = GetBugReports(tempList);
      dispatch(action);
      setListRender(tempList);
    });
  }, [dispatch, setListRender]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      //count searchterm
      let tempSearchList = debouncedSearchTerm.toLowerCase();
      tempSearchList = tempSearchList.split(" ");
      let tempList = [];
      tempList = listItems.map((item) => {
        let count = 0;
        tempSearchList.forEach((searchWord) => {
          if (searchWord.length > 0) {
            const tempTitle = item[0].title.toLowerCase();
            count = count + countInstances(tempTitle, searchWord);
            item.forEach((unit) => {
              const tempSentence = unit.content_sentence.toLowerCase();
              count = count + countInstances(tempSentence, searchWord);
              unit.count = countInstances(tempSentence, searchWord);
            });
          }
        });
              for (let i = 0; i < item.length - 1; i++) {
        for (let j = i + 1; j < item.length; j++) {
          if (item[i].count < item[j].count) {
            let temp = item[i];
            item[i] = item[j];
            item[j] = temp;
          }
        }
      }
        item.count = count;
        console.log("item count", item.count);
        return item;
      });

      //sort list by search result;
      let tempList2 = tempList.filter((item) => {
        console.log("count", item.count);
        return item.count > 0;
      });
      console.log("tempList", tempList2);

      for (let i = 0; i < tempList2.length - 1; i++) {
        for (let j = i + 1; j < tempList2.length; j++) {
          if (tempList2[i].count < tempList2[j].count) {
            let temp = tempList2[i];
            tempList2[i] = tempList2[j];
            tempList2[j] = temp;
          }
        }
      }
      console.log("list with serch render", tempList2);
      setListRender(tempList2);
    } else setListRender(listItems);
  }, [debouncedSearchTerm, listItems]);

  return (
    <div className="page">
      <SearchBar />
      <TabSearch listBugReports={listRender} />
    </div>
  );
}
