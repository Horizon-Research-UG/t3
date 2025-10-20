import archiv.cs_tools.frage_bis_es_stimmt as frage_bis_es_stimmt

#def main():


print("Wähle eine Option:")
print("z - zeigen")
print("")
print("")
print("")

x = input("Eingabe: ")

aktuelle_Prio = ["Hogwarts", "Timequest", "alles andere"]

if x == "z":
    for _ in aktuelle_Prio:
        print(_, end=" ---> ")
    print("\nEnde")

#if __name__ == "__main__":
#    main()