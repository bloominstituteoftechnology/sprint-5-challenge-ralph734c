async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
    try {
      document.querySelector("section").display = "none";
      const learnersURL = "http://localhost:3003/api/learners";
      const mentorsURL = "http://localhost:3003/api/mentors";
      const learnersRes = await axios.get(learnersURL);
      let learnerData = learnersRes.data;
      const mentorsRes = await axios.get(mentorsURL);
      let mentorData = mentorsRes.data;

      let completeLearnerArr = [];
      learnerData.forEach(learner => {
        const completeLearnerObj = {
          id: 0,
          email: "",
          fullName: "",
          mentors: []
        }
        completeLearnerObj.id = learner.id;
        completeLearnerObj.email = learner.email;
        completeLearnerObj.fullName = learner.fullName;

        let foundMentors = mentorData.filter(obj => learner.mentors.includes(obj.id));
        
        foundMentors.forEach(ment => {
          completeLearnerObj.mentors.push(`${ment.firstName} ${ment.lastName}`)
        })
        completeLearnerArr.push(completeLearnerObj);
      })
      document.querySelector("p.info").textContent = "No learner is selected";

      completeLearnerArr.forEach(learner => {
        document.querySelector(".cards").appendChild(createNewLearnerCard(learner))
      })
    } catch (err) {
      console.log(`Something returned the error --> ${err.message}`);
      document.querySelector("p.info").textContent = `Error: ${err.message}`;
    }
    function createNewLearnerCard(learner) {
      const newLearnerCard = document.createElement("div");
      newLearnerCard.classList.add("card");

      const learnerNameH = document.createElement("h3");
      learnerNameH.textContent = learner.fullName;
      newLearnerCard.appendChild(learnerNameH);

      const learnerEmailD = document.createElement("div");
      learnerEmailD.textContent = learner.email;
      newLearnerCard.appendChild(learnerEmailD);

      const learnerMentorsH = document.createElement("h4");
      learnerMentorsH.textContent = "Mentors";
      learnerMentorsH.classList.add("closed");
      newLearnerCard.appendChild(learnerMentorsH);

      const learnerMentorsList = document.createElement("ul")
      newLearnerCard.appendChild(learnerMentorsList)

      learner.mentors.forEach(mentor => {
        const learnerMentorsListItem = document.createElement("il")
        learnerMentorsListItem.textContent = mentor
        learnerMentorsList.appendChild(learnerMentorsListItem)
        })
      return newLearnerCard;
    }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
