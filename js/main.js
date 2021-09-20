// define globel var
const topButton = document.getElementById("top");
const nav = document.getElementsByTagName("ul")[0];
const contant = document.createDocumentFragment();
const container = document.querySelector(".container");
const sectionNumber = 4;
const sectionText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
consequuntur! Commodi minima excepturi repudiandae velit hic maxime
doloremque. Quaerat provident commodi consectetur veniam similique ad 
earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
quasi aliquam eligendi, placeat qui corporis!`;

// create section dymically
function createSection(text, sectionTitle) {
  const section = document.createElement("section");
  const h = document.createElement("h2");
  const div = document.createElement("div");
  h.textContent = sectionTitle;
  div.textContent = text;
  section.appendChild(h);
  section.appendChild(div);
  return section;
}

// create page content
for (let i = 0; i < sectionNumber; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = `Section ${sectionNumber - i}`;
  a.setAttribute("target-section", `section${sectionNumber - i}`);
  li.appendChild(a);
  nav.appendChild(li);

  const section = createSection(
    `Section ${sectionNumber - i} : ${sectionText}`,
    `Section ${i + 1}`
  );
  section.id = `section${i + 1}`;
  if (i % 2 != 0) {
    section.classList.add("right");
  }
  container.appendChild(section);
  a.onclick = linkClick;
}

// make a active or unactive
function active(ele) {
  let links = document.getElementsByTagName("a");
  for (let link of links) {
    if (ele === link) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}
// get Axis Y for section
function getYEle(ele) {
  let secID = ele.getAttribute("target-section");
  let targetY = document.getElementById(secID).getBoundingClientRect().y;
  smoothScroll(targetY);
}
// scroll page smootly
function smoothScroll(targetY) {
  let disPoint = targetY;
  const arrivePoint = 120;
  const step = 50;
  let dif = Math.abs(disPoint - arrivePoint);
  let dir = targetY >= 0 ? 1 : -1;

  let scroll = setInterval(() => {
    if (dif > step) {
      scrollBy(0, dir * step);
      dif -= step;
    } else {
      scrollBy(0, dir * dif);
      dif = 0;
    }
    if (dif == 0) {
      clearInterval(scroll);
    }
  }, 50);
}
// click action for a
function linkClick() {
  active(this);
  getYEle(this);
}
// lsiten to scroll event to set active section and a
document.addEventListener("scroll", () => {
  if (scrollY >= 0 && scrollY <= 300) {
    topButton.classList.add("hide");
  } else {
    topButton.classList.remove("hide");
  }
  let sections = Array.from(document.getElementsByTagName("section"));
  let links = document.getElementsByTagName("a");
  for (let section of sections) {
    let bound = section.getBoundingClientRect();
    let index = sections.indexOf(section);
    if (bound.y > 50 && bound.y < 200) {
      section.classList.add("active");
      links[sections.length - 1 - index].classList.add("active");
    } else {
      section.classList.remove("active");
      links[sections.length - 1 - index].classList.remove("active");
    }
  }
});
// top button action
topButton.onclick = () => {
  smoothScroll(-scrollY);
};
// add content to page
contant.append(nav);
contant.append(container);
document.body.appendChild(contant);
//--------------------------------------------
