#!/usr/bin/env node

import * as path from 'path';
import ora from 'ora';
import clito from 'clito';

import banner from './banner';
import WebpageCapture from 'webpage-capture';

// Print program banner
console.log('\x1B[2J\x1B[0f');
console.log(banner);

const validFormats = ['png', 'jpeg', 'pdf'];

const cli = clito({
  usage: 'webcapture [options] <targets...>',
  flags: {
    format: {
      type: 'string',
      alias: 'f',
      description: 'The capture output format',
      required: false,
      default: 'png',
      validation: v => validFormats.includes(v) || `Invalid output format "${v}", must be one of: ${validFormats}.`
    },
    timeout: {
      type: 'number',
      alias: 't',
      description: 'Set custom page load timeout',
      required: false
    },
    selector: {
      type: 'string',
      alias: 's',
      description: 'Capture element that match selector',
      required: false
    },
    viewport: {
      type: 'string',
      alias: 'v',
      description: 'List of viewport to use',
      required: false,
      multiple: true
    },
    viewportCategory: {
      type: 'string',
      alias: 'V',
      description: 'Use viewports that match category',
      required: false
    },
    outputDir: {
      type: 'string',
      alias: 'o',
      description: 'Set a custom output directory',
      required: false
    },
    debug: {
      type: 'boolean',
      alias: 'd',
      description: 'Run in headfull mode',
      required: false
    }
  },
  examples: [
    '$ webcapture "https://github.com"',
    '$ webcapture "https://github.com" "https://github.com/b4dnewz"',
    '$ webcapture -o ./output "https://github.com"',
    '$ webcapture -v nexus-10 "https://github.com"',
    '$ webcapture -V mobile "https://github.com"'
  ]
});

const {input, flags} = cli;
if (input.length === 0) {
	console.error('  You must specify one or more targets! \n');
	process.exit(1);
}

// Create the UI spinner
const spinner = ora({
	spinner: 'dots',
	text: 'Starting the capture process..'
});

// Create a new capturer with given options
const {debug, timeout, outputDir} = flags;
const capturer = new WebpageCapture({
	debug,
	timeout,
	outputDir
});

// When a entry capture starts
capturer.on('capture:start', data => {
	spinner.color = 'yellow';
	spinner.start(`Capturing ${data.input}`);
});

// When a entry capture ends
capturer.on('capture:end', data => {
  if (data.error) {
    spinner.fail(`Capture has failed with "${data.error}".`);
    return;
  }

  const outPath = path.relative(process.cwd(), data.output);
	const duration = parseFloat(data.duration).toFixed(4);
	spinner.succeed(`Captured to "${outPath}" in ${duration}ms`);
});

// Start capture
spinner.start();
capturer.capture(input, {
  ...flags,
  captureSelector: flags.selector
}).catch(console.error).then(() => {
	spinner.stop();
	console.log();
	return capturer.close();
});
