# Git & GitHub

### Git

Git is a **distributed version control system** used to track changes in files and coordinate work on those files among multiple people.

-   [Detailed online video (1 hour) about Git](https://www.youtube.com/watch?v=8JJ101D3knE). Worth the watch to get a deeper understanding about Git and its possibilities.

-   [Git Cheat Sheet](./Git%20Cheat%20Sheet.pdf)

### GitHub

GitHub is a cloud-based platform for hosting and managing Git repositories. It enables developers to collaborate, share code, and track changes while providing features like pull requests, issue tracking. It's widely used for open-source and private projects.

---

## Git

**Key features**

-   **Version Control:** Git keeps a history of all changes made to files, so you can revisit or restore earlier versions.
-   **Distributed:** Each developer has a full copy of the project, including its history, on their local machine.
-   **Collaboration:** Git helps teams work on the same project simultaneously without overwriting each other's work.
-   **Branching and Merging:** You can create branches to work on new features or fixes without affecting the main codebase. Later, these changes can be merged back into the main branch.
-   **Speed:** Most Git operations are fast and run locally, making it efficient for developers.

**Common Terms:**

-   **Repository (Repo):** A project folder managed by Git, containing all files and their version history.
-   **Stage:** The "staging area" (also called the "index") is a place where you can accumulate changes before committing them to the Git repository.
-   **Commit:** A saved change to the repository. It's like a snapshot of your project at a specific point.
-   **Branch:** A separate line of development.
-   **Merge:** Combining changes from one branch into another.
-   **Pull:** Fetching updates from a remote repository to your local copy.
-   **Push:** Sending your changes to a remote repository.
-   **Clone:** Creating a copy of a repository on your local machine.
-   **Remote:** A version of your project stored on a server, such as GitHub or GitLab.

### Install

-   https://git-scm.com/downloads
-   https://gitforwindows.org

#### First repository

-   mkdir name
-   cd name
-   git init
-   echo hello > file1.txt
-   echo hello > file2.txt
-   git status
-   git add .
-   git commit -m "My first commit"
-   echo world >> file1.txt
-   git status
-   rm file2.txt
-   git status

---

## GitHub

-   Create an account at github.com
-   Create a new repository
-   Clone repository to local computer
    -   Error ...

#### SSH Key

To create and add an **SSH key** on Windows for GitHub, follow these steps:

**1. Check for Existing SSH Keys**
Before creating a new key, check if you already have one:

1. Open **Git Bash** or any terminal with SSH installed.
2. Run:
    ```bash
    ls ~/.ssh
    ```
3. Look for files like `id_rsa` and `id_rsa.pub`. If they exist, you already have an SSH key.

    - If you're unsure about using an existing key, continue with the steps below to create a new one.

**2. Generate a New SSH Key**

1. In **Git Bash**, run the following command:

    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

    - Replace `your_email@example.com` with the email address associated with your GitHub account.
    - If you want to use RSA instead of ED25519, use:
        ```bash
        ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
        ```

2. When prompted:
    - **Enter a file location:** Press **Enter** to save the key in the default location (`~/.ssh/id_ed25519` or `~/.ssh/id_rsa`).
    - **Enter a passphrase:** Optionally, set a passphrase for added security, or press **Enter** to skip.

**3. Add the SSH Key to the SSH Agent**

1. Start the SSH agent:

    ```bash
    eval "$(ssh-agent -s)"
    ```

2. Add your SSH private key to the agent:
    ```bash
    ssh-add ~/.ssh/id_ed25519
    ```
    - Replace `id_ed25519` with `id_rsa` if you're using RSA.

**4. Copy the Public Key**
You need to copy the **public key** to your clipboard to add it to GitHub:

1. Run:

    ```bash
    clip < ~/.ssh/id_ed25519.pub
    ```

    - This copies the content of your public key (`id_ed25519.pub`) to your clipboard.

    - If you used RSA:
        ```bash
        clip < ~/.ssh/id_rsa.pub
        ```

**5. Add the SSH Key to GitHub**

1. Go to your GitHub account and navigate to:
   **Settings** → **SSH and GPG keys** → **New SSH Key**.

2. Fill in the form:

    - **Title:** Name the key (e.g., "Windows PC").
    - **Key:** Paste the copied public key.

3. Click **Add SSH Key**.

**6. Test the SSH Connection**
Verify that the SSH key works:

1. Run:

    ```bash
    ssh -T git@github.com
    ```

2. If successful, you'll see a message like:
    ```
    Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
    ```
