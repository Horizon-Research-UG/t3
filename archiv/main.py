def ask():
    x = input("Wähle deinen Weg: ")
    return x


a1 = ["Trinken", "Zähne", "Rachen", "Inhalieren"]

b = "📚(Level: hart)"

a2 = ["Zitrone", "Spaziergang", "Licht an & Lernen {b}"]


def show_way():
    if x == "h1":
        for _ in a1:
            print(_, end = " ---> ")
        print("\nEnde - a1")
    elif x == "h2":
        for _ in a2:
            print(_, end = " ---> ")
        print("\nEnde - a2")

def main():
    global x
    while True:
        x = ask()
        show_way()


if __name__ == "__main__":
    main()