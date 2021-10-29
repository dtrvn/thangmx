import React, { Component, Fragment } from 'react';
import ReactExport from 'react-data-export';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ExcelCell = ReactExport.ExcelFile.ExcelCell;

const ExportExcel = ({
    shiftRegisters,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
    users,
    shifts,
    jobs,
    branchName,
}) => {

    const multiDataSet = [
        {
            // Line Header
            columns: [
                { title: `${branchName}`, width: { wpx: 200 }, style: { font: { sz: "24", bold: true } } },
            ],
            data: [
                [
                    { value: "" },
                ]
            ]
        },
        {
            // Line 2, 3
            columns: [
                {
                    title: "Họ Và Tên",
                    width: { wch: 40 },
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "Thứ 2",
                    width: { wpx: 50 },
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "Thứ 3",
                    width: { wpx: 50 },
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "Thứ 4",
                    width: { wpx: 50 },
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "Thứ 5",
                    width: { wpx: 50 },
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "Thứ 6",
                    width: { wpx: 50 },
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "Thứ 7",
                    width: { wpx: 50 },
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "Chủ nhật",
                    width: { wpx: 50 },
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "Lương",
                    width: { wpx: 50 },
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
                {
                    title: "",
                    width: { wpx: 50 },
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                    }
                },
            ],
            data: [
                [
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: `${moment(monday).format('MM/DD')}`,
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: `${moment(tuesday).format('MM/DD')}`,
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: `${moment(wednesday).format('MM/DD')}`,
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: `${moment(thursday).format('MM/DD')}`,
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: `${moment(friday).format('MM/DD')}`,
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: `${moment(saturday).format('MM/DD')}`,
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: `${moment(sunday).format('MM/DD')}`,
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                    {
                        value: "",
                        style: {
                            font: { sz: "14", bold: false },
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "c7d6a1" } }
                        }
                    },
                ]
            ]
        }
    ];

    let eleCols = [];
    let eleData = [];

    const resetValue = (idx) => {
        eleData = [];
        // eleCols = [];
        for (let i = 0; i <= 24; i++) {
            // Set value default for Data
            if (i < 22) {
                eleData.push({
                    value: "",
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        }
                    }
                });
            }
            if (i === 22) {
                eleData.push({
                    value: "",
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        }
                    }
                });
            }
            if (i === 23) {
                eleData.push({
                    value: "",
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        }
                    }
                });
            }
            if (i === 24) {
                eleData.push({
                    value: "",
                    style: {
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        }
                    }
                });
            }
            // Set value default for Columns
            if (idx === 0) {
                if (i === 0) {
                    eleCols.push({
                        title: "",
                        width: { wch: 40 },
                        style: {
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            }
                        }
                    })
                }
                // Ca 1
                if (i === 1 || i === 4 || i === 7 || i === 10 || i === 13 || i === 16 || i === 19) {
                    eleCols.push({
                        title: `${shifts[0].shiftName}`,
                        style: {
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "71f74a" } },
                            alignment: {
                                horizontal: "center"
                            }
                        }
                    })
                }
                // Ca 2
                if (i === 2 || i === 5 || i === 8 || i === 11 || i === 14 || i === 17 || i === 20) {
                    eleCols.push({
                        title: `${shifts[1].shiftName}`,
                        style: {
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "4ba6ed" } },
                            alignment: {
                                horizontal: "center"
                            }
                        }
                    })
                }
                // Ca 3
                if (i === 3 || i === 6 || i === 9 || i === 12 || i === 15 || i === 18 || i === 21) {
                    eleCols.push({
                        title: `${shifts[2].shiftName}`,
                        style: {
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            },
                            fill: { patternType: "solid", fgColor: { rgb: "f5c344" } },
                            alignment: {
                                horizontal: "center"
                            }
                        }
                    })
                }
                if (i === 22) {
                    eleCols.push({
                        title: "",
                        style: {
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                left: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            }
                        }
                    })
                }
                if (i === 23) {
                    eleCols.push({
                        title: "",
                        style: {
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            }
                        }
                    })
                }
                if (i === 24) {
                    eleCols.push({
                        title: "",
                        style: {
                            border: {
                                top: { style: "thin", color: { rgb: "000000" } },
                                right: { style: "thin", color: { rgb: "000000" } },
                                bottom: { style: "thin", color: { rgb: "000000" } }
                            }
                        }
                    })
                }
            }
        }
    }

    let getUsers = null;
    let shiftIndex = null;
    let jobIndex = null;
    let checkDayFlag = null;
    let costAmount = 0;
    let tempArray = [];
    shiftRegisters.map((ele, idx) => {
        resetValue(idx);
        costAmount = 0;
        getUsers = users.find(({ _id }) => _id === ele.userId);
        // Add name
        eleData[0] =
        {
            value: `${getUsers.name}`,
            style: {
                font: { sz: "14", bold: false },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } }
                }
            }

        };
        ele.register.map((reg) => {
            shiftIndex = shifts.findIndex(x => x._id === reg.shiftId);
            jobIndex = jobs.findIndex(x => x._id === reg.jobId);
            costAmount = costAmount + reg.cost;
            // Add monday
            if (moment(reg.date).format('MM-DD-YYYY') === moment(monday).format('MM-DD-YYYY')) {
                checkDayFlag = 1;
            }
            // Add tuesday
            if (moment(reg.date).format('MM-DD-YYYY') === moment(tuesday).format('MM-DD-YYYY')) {
                checkDayFlag = 4;
            }
            // Add wednesday
            if (moment(reg.date).format('MM-DD-YYYY') === moment(wednesday).format('MM-DD-YYYY')) {
                checkDayFlag = 7;
            }
            // Add thursday
            if (moment(reg.date).format('MM-DD-YYYY') === moment(thursday).format('MM-DD-YYYY')) {
                checkDayFlag = 10;
            }
            // Add friday
            if (moment(reg.date).format('MM-DD-YYYY') === moment(friday).format('MM-DD-YYYY')) {
                checkDayFlag = 13;
            }
            // Add saturday
            if (moment(reg.date).format('MM-DD-YYYY') === moment(saturday).format('MM-DD-YYYY')) {
                checkDayFlag = 16;
            }
            // Add sunday
            if (moment(reg.date).format('MM-DD-YYYY') === moment(sunday).format('MM-DD-YYYY')) {
                checkDayFlag = 19;
            }

            if (shiftIndex === 0) {
                // Ca 1
                eleData[checkDayFlag] =
                {
                    value: `${jobs[jobIndex].jobName}`,
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "71f74a" } },
                        alignment: {
                            horizontal: "center"
                        }
                    }

                };
            }
            if (shiftIndex === 1) {
                // Ca 2
                eleData[checkDayFlag + 1] =
                {
                    value: `${jobs[jobIndex].jobName}`,
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "4ba6ed" } },
                        alignment: {
                            horizontal: "center"
                        }
                    }

                };
            }
            if (shiftIndex === 2) {
                // Ca 3
                eleData[checkDayFlag + 2] =
                {
                    value: `${jobs[jobIndex].jobName}`,
                    style: {
                        font: { sz: "14", bold: false },
                        border: {
                            top: { style: "thin", color: { rgb: "000000" } },
                            left: { style: "thin", color: { rgb: "000000" } },
                            right: { style: "thin", color: { rgb: "000000" } },
                            bottom: { style: "thin", color: { rgb: "000000" } }
                        },
                        fill: { patternType: "solid", fgColor: { rgb: "f5c344" } },
                        alignment: {
                            horizontal: "center"
                        }
                    }

                };
            }
        })
        // Add salary of personal
        eleData[24] =
        {
            value: `${costAmount}`,
            style: {
                font: { sz: "15", bold: true },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } }
                },
                numFmt: "#,###",
                alignment: {
                    horizontal: "right"
                }
            }

        };
        tempArray.push(eleData);
    })
    if (tempArray.length > 0) {
        multiDataSet.push({ columns: eleCols, data: tempArray });
    }

    // multiDataSet.push({ columns: eleCols, data: [eleData] });
    // console.log("output " + JSON.stringify(multiDataSet));
    // console.log("output "+JSON.stringify(eleCols));
    // console.log("output "+JSON.stringify(eleData));
    const sheetName1 = moment(monday).format('MM-DD');
    const sheetName2 = moment(sunday).format('MM-DD');

    return (
        <Fragment>
            <div>
                <ExcelFile filename="Dang ki ca" element={<button type="button" class="btn btn-warning" 
                                    style={{ marginLeft: "10px" }}><i class="ti-import"></i>{"  "}Xuất Excel</button>}>
                    <ExcelSheet dataSet={multiDataSet} name={`${sheetName1} ~ ${sheetName2}`} />
                </ExcelFile>
            </div>
        </Fragment>
    );
};

ExportExcel.propTypes = {
    shiftRegisters: PropTypes.object.isRequired,
    monday: PropTypes.object.isRequired,
    tuesday: PropTypes.object.isRequired,
    wednesday: PropTypes.object.isRequired,
    thursday: PropTypes.object.isRequired,
    friday: PropTypes.object.isRequired,
    saturday: PropTypes.object.isRequired,
    sunday: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    shifts: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired,
    branchName: PropTypes.object.isRequired,
};

export default connect(null, {})(
    ExportExcel
);