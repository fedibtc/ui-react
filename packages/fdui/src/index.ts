#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";

inquirer
  .prompt([
    {
      type: "list",
      name: "componentName",
      message: "Choose component",
      loop: false,
      choices: [
        "Avatar",
        "Button",
        "Checkbox",
        "CheckboxGroup",
        "Dialog",
        "Input",
        "NostProvider",
        "RadioGroup",
        "Scanner",
        "Text",
        "Toast",
        "WebLNProvider",
      ],
    },
    {
      type: "input",
      name: "compDir",
      default: "components/ui",
      message: "Where do you want to create the component?",
      validate: (value: string) => {
        if (!value.length) return "Please enter a valid path";

        try {
          const dir = fs.readdirSync(value, {
            encoding: "utf-8",
          });

          if (Array.isArray(dir) && dir.length > 0) {
            return true;
          }
        } catch (err) {
          return (err as Error).message;
        }
      },
    },
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((err) => {
    if (err.isTtyError) {
      console.log(err.message);
    } else {
      console.log("Dead");
    }
  });
