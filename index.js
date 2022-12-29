const fetch = require("node-fetch");
const asyncSema = require("async-sema");
const { delayedPromiseRetry } = require('delayed-promise-retry');
const fs = require("fs");

const BASE_ENDPOINT = "https://www.trainerroad.com";
const TRAINER_ROAD_AUTH_TOKEN = "79B707DEFFB883216D4092A20DB22FE5CAD9D4E8C011B3CC9571E820651D3DE325484EB3A3531C5732958313482CA19DBE6C4A0152B21337815F40B43FCAD1A0A9FAA368C42DA170EA9CF8435C449973D30A0F2263B12CA69FCFA7A6A64405436E308AF4DDD261C1667676FA63590504";

const getAllWorkoutsIds = async () => {
  let pageNumber = 0;
  const totalCount = 3219;
  const workoutsIds = [];
  for (let i = 0; workoutsIds.length < 3219; i += 1) {
    const fn = async () => await fetch(`${BASE_ENDPOINT}/app/api/workouts`, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json",
        "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "cookie": "_rm=dcc27b4b-6eb9-43c9-b2f0-8a0ea2be10d4; _fbp=fb.1.1671159185618.613902599; TrainerRoadAuth=79B707DEFFB883216D4092A20DB22FE5CAD9D4E8C011B3CC9571E820651D3DE325484EB3A3531C5732958313482CA19DBE6C4A0152B21337815F40B43FCAD1A0A9FAA368C42DA170EA9CF8435C449973D30A0F2263B12CA69FCFA7A6A64405436E308AF4DDD261C1667676FA63590504; OptanonAlertBoxClosed=2022-12-24T23:49:41.730Z; _gid=GA1.2.956941956.1672287089; _ga=GA1.1.544292061.1671159188; ___uLangPref=en_US; __atuvc=27%7C50%2C9%7C51%2C3%7C52; OptanonConsent=isGpcEnabled=1&datestamp=Thu+Dec+29+2022+01%3A13%3A51+GMT-0300+(Brasilia+Standard+Time)&version=6.34.0&hosts=&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&landingPath=NotLandingPage&consentId=09f9367f-3c3c-431a-99fd-6adbecf8533a; .ASPXROLES=P9gHW7xSUg_lVUtK49cXvFdsClie_yEl4yqj0XXDW5TNMszwfWbBkawq-acXObYxfQzPI46mwxI1SjdqsgNJ-XG_jadRq-TC3lSHKIYG-1L-zngcgwVt9-R25UK1pqKl1wb0EuWz3zO34KQOXHFWiOvDHw2n1boQKGjDdmUwATkLkwuvuOV6KhpUR9y8zFW-wU2e_5bleUeBnH2UZBLRpFMqDiyl2ei5vo6FCbdqt4JbdisRkur2vTqYZw_kRjVjfCndB-EguG-jdzGmFTejl6P2hf7Iy9jCEhzEfjBXD06-zvBOCmUxa6rAOOgkpcsA6mLcN94hyRVBOguoIIm2MmiKjvC_bASmebUUI6Hnnb74TZZNRDjoPFs01clnJZkQvYC1WQioknQ2474EJqv19IpovIoA6pXzR-KQGpruj5Kk3SrE6aYaiOj9LaYrwwAu0eccrLNmktxN1YEwAytCoPYtqd5oaKUfI8Lz5F5svolDwdyhLOhZaJXK6ppbS8rLByYH0VpXQDgkJ_c7uHPy2v15HTOFMDG0KgyWt8N1hAE1; _ga_RDZWWKPE5E=GS1.1.1672287090.12.1.1672289072.0.0.0; _ga_1T1311ZSNM=GS1.1.1672287090.12.1.1672289072.0.0.0",
        "Referer": `${BASE_ENDPOINT}/app/cycling/workouts`,
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": `{\"searchText\":\"\",\"sortProperty\":\"progressionLevel\",\"isDescending\":false,\"pageNumber\":${pageNumber},\"pageSize\":10,\"totalCount\":${totalCount},\"teamIds\":[],\"teamOptions\":[],\"general\":{\"searchText\":\"\",\"sortProperty\":\"progressionLevel\",\"isDescending\":false,\"pageNumber\":${pageNumber},\"pageSize\":10,\"totalCount\":${totalCount},\"teamIds\":[],\"teamOptions\":[]},\"zones\":{\"Endurance\":false,\"Tempo\":false,\"SweetSpot\":false,\"Threshold\":false,\"Vo2Max\":false,\"Anaerobic\":false,\"ActiveRecovery\":false,\"Sprint\":false},\"zoneProfiles\":{\"Endurance\":[],\"Tempo\":[],\"SweetSpot\":[],\"Threshold\":[],\"Vo2Max\":[],\"Anaerobic\":[],\"Sprint\":[]},\"durations\":{\"LessThanFortyFive\":false,\"FortyFive\":false,\"OneHour\":false,\"OneHourFifteen\":false,\"OneHourThirty\":false,\"OneHourFortyFive\":false,\"TwoHours\":false,\"TwoHoursFifteen\":false,\"TwoHoursThirty\":false,\"MoreThanTwoHoursThirty\":false},\"intensities\":{\"Recovery\":false,\"Moderate\":false,\"Hard\":false,\"Intense\":false,\"Insane\":false},\"intervals\":{\"Burst\":false,\"Short\":false,\"Medium\":false,\"Long\":false},\"workoutInstructions\":{\"Yup\":false,\"Nope\":false},\"custom\":{\"Yup\":false,\"Nope\":false},\"workoutTags\":{\"WorkoutTagIds\":[]},\"workoutLabels\":{\"WorkoutLabelIds\":[]},\"workoutTypes\":{\"Standard\":false,\"Test\":false,\"Warmup\":false,\"RaceSimulation\":false,\"Video\":false},\"progressions\":{\"ProgressionIds\":[],\"ProgressionLevels\":[],\"ProfileIds\":[],\"WorkoutTypeIds\":[]},\"workoutDifficultyRatings\":{\"Recovery\":false,\"Achievable\":false,\"Productive\":false,\"Stretch\":false,\"Breakthrough\":false},\"allProfiles\":{\"ProfileIds\":[]},\"favorite\":{\"Yup\":false,\"Nope\":false}}`,
      "method": "POST"
    });
    const response = await delayedPromiseRetry(fn, 20, 1000);
    const body = await response.json();
    const currentPageWorkoutsIds = body.Workouts.map(workout => workout.Id);
    workoutsIds.push(...currentPageWorkoutsIds);
    pageNumber += 1;
    console.log(`Page: ${pageNumber} / IDs Count: ${workoutsIds.length}`);
  }
  return workoutsIds;
};

const getWorkoutById = (workoutId) => {
  console.log(`Fetching ${workoutId}...`);
  return fetch(`${BASE_ENDPOINT}/api/workoutdetails/${workoutId}`, {
    headers: {
      cookie: `TrainerRoadAuth=${TRAINER_ROAD_AUTH_TOKEN}`,
    },
    body: null,
    method: "GET",
  })
    .then((workoutResponse) => workoutResponse.json());
};

async function downloadWorkouts(workoutIds, requestLimit) {
  const rateLimit = asyncSema.RateLimit(requestLimit);

  for (const [i, workoutId] of workoutIds.entries()) {
    await rateLimit();

    const fn = async () => await getWorkoutById(workoutId);

    delayedPromiseRetry(fn, 20, 1000).then((workoutResponse) => {
      const workout = workoutResponse.Workout;
      const workoutSeconds = workout.workoutData;
      const intervals = workout.intervalData;
      const mappedIntervals = [];
      const workoutName = workout.Details.WorkoutName;
      const workoutDescription = `${workout.Details.WorkoutDescription}\n\n${workout.Details.GoalDescription}\n\n${BASE_ENDPOINT}/cycling/workouts/${workout.Details.Id}`;

      for (let i = 1, length = intervals.length; i < length; i++) {
        const interval = intervals[i];

        const intervalLength = interval.End - interval.Start;
        const startSecond = interval.Start * 1000;
        const endSecond = interval.End * 1000;

        const workoutElements = workoutSeconds.filter((e) => e.seconds >= startSecond && e.seconds < endSecond);

        var firstElement = workoutElements[0];
        var lastElement = workoutElements[workoutElements.length - 1];

        var startFtp = firstElement.ftpPercent / 100;
        var endFtp = lastElement.ftpPercent / 100;

        if (startFtp === endFtp) {
          mappedIntervals.push(`<SteadyState Duration="${intervalLength}" Power="${startFtp}"></SteadyState>`);
        } else if (startFtp < endFtp) {
          mappedIntervals.push(`<Warmup Duration="${intervalLength}" PowerLow="${startFtp}" PowerHigh="${endFtp}"></Warmup>`);
        } else {
          mappedIntervals.push(`<Cooldown Duration="${intervalLength}" PowerLow="${startFtp}" PowerHigh="${endFtp}"></Cooldown>`);
        }
      }

      const workoutFile = `<workout_file>
	<author>TrainerRoad</author>
	<name>${workoutName}</name>
	<description><![CDATA[${workoutDescription}]]></description>
	<sportType>bike</sportType>
	<tags/>
	<workout>
		${mappedIntervals.join("\n        ")}
	</workout>
</workout_file>`;

      fs.writeFile(`${workoutName.replaceAll(" ", "_")}.zwo`, workoutFile, (error) => {
        if (error) throw error;
        console.log(`#${i} Generated ${workoutName}.zwo file.`);
      });
    });
  }
}

const getAllWorkoutsIdsAndDowload = async (requestLimit) => {
  const workoutIds = await getAllWorkoutsIds();
  await downloadWorkouts(workoutIds, requestLimit);
};

getAllWorkoutsIdsAndDowload(5);
