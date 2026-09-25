import Lead from "../models/Lead.js";

/*
  META WEBHOOK VERIFICATION

  Meta sends a GET request when we configure
  the webhook.

  We need to return the challenge if the
  verify token is correct.
*/

export const verifyMetaWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  const verifyToken = process.env.META_VERIFY_TOKEN;

  if (
    mode === "subscribe" &&
    token === verifyToken
  ) {
    console.log("Meta webhook verified successfully");

    return res.status(200).send(challenge);
  }

  console.log("Meta webhook verification failed");

  return res.sendStatus(403);
};


/*
  META WEBHOOK EVENTS

  Meta sends POST requests here when
  an event occurs.
*/

export const handleMetaWebhook = async (req, res) => {
  try {
    console.log(
      "Meta webhook received:",
      JSON.stringify(req.body, null, 2)
    );

    /*
      IMPORTANT:

      We acknowledge the webhook quickly.

      This prevents Meta from repeatedly
      retrying the webhook because of a
      slow response.
    */

    res.sendStatus(200);

    const body = req.body;

    /*
      We only process Meta page events
      for now.
    */

    if (body.object !== "page") {
      return;
    }

    /*
      Meta can send multiple entries.
    */

    for (const entry of body.entry || []) {

      for (const change of entry.changes || []) {

        /*
          Lead Ads normally use the
          "leadgen" field.

          We don't yet assume the exact
          payload structure for every
          Meta product/version.
        */

        if (change.field !== "leadgen") {
          continue;
        }

        const leadgenData = change.value;

        console.log(
          "Lead event received:",
          leadgenData
        );

        /*
          For the first integration stage,
          we log the event.

          Next we will use the Meta Graph API
          to retrieve the actual lead fields
          using the leadgen_id.
        */

        const leadgenId =
          leadgenData.leadgen_id;

        console.log(
          "Meta Lead ID:",
          leadgenId
        );

        /*
          We will complete the actual
          lead-field retrieval in Step 2.
        */
      }
    }

  } catch (error) {

    console.error(
      "Meta webhook error:",
      error
    );
  }
};