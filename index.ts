import { screen , box, table , filemanager} from 'blessed';
import { readdir } from 'fs/promises';
import { mkdir } from 'node:fs/promises';
import { join as pathJoin } from 'path';

// Create a screen object.
var myScreen = screen({
  smartCSR: true,
  dump: __dirname + '/logs/file.log',
  warnings: true
})
async function fire(path: string) : Promise<string[]> {
    return await readdir(path);
}

// Create a box perfectly centered horizontally and vertically.
var rightBox = box({
  parent: myScreen,
  top: 0,
  right: 0,
  width: '40%',
  height: '100%',
  content: '{center}commands{/center}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
})

const myMiniBox = box({
    parent: rightBox,
    bottom: 0,
    right: 0,
    width: '97%',
    height: '20%',
    content: '{center}\n close me!{/center}',
    tags: true,
    style: {
      fg: 'black',
      bg: 'white',
     
      hover: {
        bg: 'red'
      }
    }
})

var fm = filemanager({
  parent: myScreen,
  border: 'line',
  style: {
    selected: {
      bg: 'blue'
    }
  },
  height: '100%',
  width: 'half',
  top: 'center',
  left: 'left',
  label: ' {blue-fg}%path{/blue-fg} ',
  cwd: process.env.HOME,
  keys: true,
  vi: true,
  scrollable: true,
  scrollbar: {
    ch: ' '
  }
});

var newFolder = box({
  parent: rightBox,
    top: '50%',
    right: 0,
    width: '97%',
    height: '20%',
    content: '{center}\n New Folder{/center}',
    tags: true,
    style: {
      fg: 'black',
      bg: 'white',
     
      hover: {
        bg: 'red'
      }
    }
});


fm.refresh();
myScreen.render();
fm.focus();

    
newFolder.on('click', async function() {
    await mkdir(pathJoin(fm.cwd, "New Folder"), { recursive: true }) 
    fm.refresh();
    fm.focus();
})

myMiniBox.on('click', function() { 
    process.exit(0);
 });

// Quit on Escape, q, or Control-C.
myScreen.key(['escape', 'q', 'C-c'], function() {
  return process.exit(0);
});
