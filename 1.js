const comments = [
    {
      id: 1,
      text: "This is the first comment",
      parentId: null,
      replies: [
        {
          id: 2,
          text: "This is a reply to the first comment",
          parentId: 1,
          replies: [
            {
              id: 3,
              text: "This is a nested reply",
              parentId: 2,
              replies: [] // Further nesting possible
            }
          ]
        }
      ]
    },
    {
      id: 4,
      text: "This is an independent comment",
      parentId: null,
      replies: []
    },
    // Additional comment objects...
  ];

  function generateCommentHtml(comment, nestingLevel) {
    const div = document.createElement("div");
    div.classList.add("comment");
    div.style.marginLeft = `${nestingLevel * 20}px`; // Adjust indentation based on nesting level
    div.textContent = comment.text;

    // Recursively handle replies
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.forEach(reply => {
        const replyHtml = generateCommentHtml(reply, nestingLevel + 1);
        div.appendChild(replyHtml);
      });
    }

    return div;
  }

  function appendCommentsToContainer(container, commentsArray) {
    // Clear existing content
    container.innerHTML = "";

    // Iterate over top-level comments (where parentId is null)
    commentsArray.forEach(comment => {
      if (comment.parentId === null) {
        const commentHtml = generateCommentHtml(comment, 0); // Start with nesting level 0
        container.appendChild(commentHtml);
      }
    });
  }

function append(){
    appendCommentsToContainer(document.getElementById("commentsContainer"), comments);
}
