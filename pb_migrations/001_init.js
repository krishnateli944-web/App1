/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {

  // ── USERS — list/view rule fix ──
  try {
    const users = app.findCollectionByNameOrId("users")
    users.listRule = "@request.auth.id != ''"
    users.viewRule = "@request.auth.id != ''"
    app.save(users)
  } catch(e) {}

  // ── ROOMS ──
  try {
    app.findCollectionByNameOrId("rooms")
  } catch(_) {
    const rooms = new Collection({
      name: "rooms",
      type: "base",
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name:"name",    type:"text", required:true  },
        { name:"members", type:"json", required:false },
        { name:"isDM",    type:"bool", required:false },
        { name:"friendDb",     type:"text", required:false },
        { name:"friendRoomId", type:"text", required:false }
      ]
    })
    app.save(rooms)
  }

  // ── MESSAGES ──
  try {
    app.findCollectionByNameOrId("messages")
  } catch(_) {
    const messages = new Collection({
      name: "messages",
      type: "base",
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name:"text",          type:"text", required:false },
        { name:"sender",        type:"text", required:true  },
        { name:"senderName",    type:"text", required:false },
        { name:"room",          type:"text", required:true  },
        { name:"forwardedFrom", type:"text", required:false },
        {
          name:"media", type:"file", required:false,
          options:{
            maxSelect:1, maxSize:10485760,
            mimeTypes:["image/jpeg","image/png","image/gif","image/webp","video/mp4","video/quicktime","video/webm"]
          }
        }
      ]
    })
    app.save(messages)
  }

}, (app) => {
  // DOWN — rollback
  try { app.delete(app.findCollectionByNameOrId("messages")) } catch(e) {}
  try { app.delete(app.findCollectionByNameOrId("rooms")) } catch(e) {}
})
