import React from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { isUndefined } from "lodash";

interface Props {
  jsonData: string;
  fileName: string;
  classname?: string;
}

export default function ExportToCSVButton({
  jsonData,
  fileName,
  classname,
}: Props) {
  try {
    const parsedData = JSON.parse(jsonData);
    const handleExportCSV = () => {
      const csvData = Papa.unparse(
        !isUndefined(parsedData[0]) ? parsedData : [parsedData]
      );
      const csvBlob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(csvBlob, fileName);
    };
    return (
      <div className={classname}>
        <p
          className=" cursor-pointer text-green-500 py-1 px-3 border border-green-400 w-full h-[52px] text-center leading-[46px]"
          onClick={handleExportCSV}
        >
          Export CSV
        </p>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <p className=" cursor-not-allowed text-gray-500 py-1 px-3 border border-gray-400 w-full h-[52px] text-center leading-[46px]">
          Export CSV
        </p>
      </div>
    );
  }
}
