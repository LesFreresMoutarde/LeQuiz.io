<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * QuestionType
 *
 * @ORM\Table(name="question_type", uniqueConstraints={@ORM\UniqueConstraint(name="question_type_label_key", columns={"label"}), @ORM\UniqueConstraint(name="question_type_name_key", columns={"name"})})
 * @ORM\Entity
 */
class QuestionType
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="question_type_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="label", type="string", length=80, nullable=false)
     */
    private $label;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime", nullable=false)
     */
    private $createdat;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="datetime", nullable=false)
     */
    private $updatedat;


}
