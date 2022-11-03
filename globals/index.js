import fetch from "node-fetch";
import fs from "fs";
import prompt from "prompt";
import colors from "@colors/colors";
import gradient from "gradient-string";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

global.fetch = fetch;
global.fs = fs;
global.yargs = yargs(hideBin(process.argv));
global.prompt = prompt;
global.colors = colors;
global.gradient = gradient;
