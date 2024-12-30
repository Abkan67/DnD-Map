//You might want to make discs always above images.
let isMoving = false;
var chosen = null;
const battleGrid = document.getElementById("battleGrid");
const Sdescription = document.getElementById("spriteDescription");
const Sname = document.getElementById("spriteName");
const Shealth = document.getElementById("spriteDamage");
let sprites = [];
let discID;
let DiscsCreated = 0;
let topness = 1;

function Image(index) {
  this.src = prompt("Paste the URL of the image below");
  this.index = index;
  discID = sprites.length;
  this.image = document.createElement("img");
  this.image.setAttribute("class", "images");
  this.image.setAttribute("id", discID);
  this.image.setAttribute("src", this.src)
  battleGrid.appendChild(this.image);
  this.name = "";
  this.description = "";
  this.health = 0;
  this.selection = () => {
    if (chosen !== this.index) {
    if (chosen !== null) {unselectDisc(chosen);}
    chosen = this.index;
    selectDisc(chosen);
    document.getElementById(chosen).addEventListener("click", makeDiscMove);};
  }
  document.getElementById(discID).addEventListener("click", this.selection);
  this.hoverOver = () => {
    document.getElementById(this.index).style.borderColor = "grey";
  };
  document.getElementById(discID).addEventListener("mouseover", this.hoverOver);
  this.hoverDone = () => {
    if(chosen == this.index) {
      document.getElementById(this.index).style.borderColor = "red";
    } else {
      document.getElementById(this.index).style.borderColor = "transparent";
    };
  };
  document.getElementById(discID).addEventListener("mouseout", this.hoverDone);
}
function Disc(index) {
  this.index = index;
  discID = sprites.length;
  this.disc = document.createElement("div");
  this.disc.setAttribute("class", "sprites");
  this.disc.setAttribute("id", discID);
  battleGrid.appendChild(this.disc);
  this.name = "";
  this.description = "";
  this.health = 0;
  this.selection = () => {
    if (chosen !== this.index) {
    if (chosen !== null) {unselectDisc(chosen);}
    chosen = this.index;
    selectDisc(chosen);
    document.getElementById(chosen).addEventListener("click", makeDiscMove);};
  }
  document.getElementById(discID).addEventListener("click", this.selection);
  this.hoverOver = () => {
    document.getElementById(this.index).style.borderColor = "grey";
  };
  document.getElementById(discID).addEventListener("mouseover", this.hoverOver);
  this.hoverDone = () => {
    if(chosen == this.index) {
      document.getElementById(this.index).style.borderColor = "red";
    } else {
      document.getElementById(this.index).style.borderColor = "transparent";
    };
  };
  document.getElementById(discID).addEventListener("mouseout", this.hoverDone);
}


function makeDiscMove() {
  isMoving = true;
  battleGrid.addEventListener("mousemove", moveDisc);
  document.getElementById(chosen).addEventListener("click", stopMakingDiscMove);
}

function stopMakingDiscMove() {
  isMoving = false;
  battleGrid.removeEventListener("mousemove", moveDisc);
  document.getElementById(chosen).removeEventListener("click", stopMakingDiscMove);
}

function moveDisc(e) {
  document.getElementById(chosen).style.top = (e.y - document.getElementById(chosen).offsetHeight/2) + "px";
  document.getElementById(chosen).style.left = (e.x - document.getElementById(chosen).offsetWidth/2) + "px";
}


function selectDisc(selected) {
  document.getElementById("spriteInfo").style.display = "block";
  document.getElementById(selected).style.borderColor = "red";
  document.getElementById(selected).style.borderWidth = "3px";
  topness++;
  document.getElementById(selected).style.zIndex = topness;
  var newSprite = sprites[selected];
    Sdescription.innerHTML = newSprite.description;
    Sname.innerHTML = newSprite.name;
    Shealth.innerHTML = newSprite.health;
}
function unselectDisc(unselected) {
  if (isMoving) {
     stopMakingDiscMove();
  }
  document.getElementById(unselected).style.borderColor = "transparent";
  document.getElementById(unselected).style.borderWidth = "2px";
  var oldSprite = sprites[unselected];
    oldSprite.description = Sdescription.innerHTML;
    oldSprite.name = Sname.innerHTML;
    oldSprite.health = Shealth.innerHTML;
    document.getElementById(unselected).innerHTML = oldSprite.name;
    document.getElementById(unselected).removeEventListener("click", makeDiscMove);
}
document.getElementById("newButton").addEventListener("click", function() {
  sprites.push(new Disc(sprites.length));
  sprites[sprites.length - 1].selection();
 });
document.getElementById("deletion").addEventListener("click", deleteDisc);
function deleteDisc() {
var shouldDelete = confirm("Are You Sure?");
  if (chosen !== null && shouldDelete == true) {
    document.getElementById(chosen).remove();
    document.getElementById("spriteInfo").style.display = "none";
    chosen = null;
  };
};
document.getElementById("done").addEventListener("click", function() {
  if (chosen != null) {
    unselectDisc(chosen);}
  document.getElementById("spriteInfo").style.display = "none";
  chosen = null;
});
document.getElementById("imageButton").addEventListener("click", function() {
  sprites.push(new Image(sprites.length));
  sprites[sprites.length - 1].selection();
});
document.getElementById("changeSize").addEventListener("click", function() {
  var newWidth = prompt("How many pixels should the width be", "30");
  var newHeight = prompt("How many pixels should the height be", "30");
  if (newWidth >= 5 && newHeight >= 5) {
    document.getElementById(chosen).style.width = newWidth + "px";
    document.getElementById(chosen).style.height = newHeight + "px";
  } else {alert("That Number is Too Small");}
});
